const path = require("path");
const { set } = require("dot-prop");
const protobufSchema = require("protocol-buffers-schema");

const filesReader = require("../utils/filesReader");

/**
 * @param {any} packagesStructure
 * @param {string} rootPackageName
 * @param {string} protofileName
 * @param {Buffer} protoFileContent
 */
const processFile = (packagesStructure, rootPackageName, protofileName, protoFileContent) => {
  const protoFileScheme = protobufSchema.parse(protoFileContent);

  const packageName = protoFileScheme.package;
  const fileBaseName = path.basename(protofileName, path.extname(protofileName));
  const namespaceName =
    rootPackageName === undefined || !packageName || packageName === rootPackageName
      ? fileBaseName
      : `${packageName}.${fileBaseName}`;
  set(packagesStructure, namespaceName, protoFileScheme);

  return protoFileScheme;
};

/**
 * @param {string} parentKey
 * @param {any} structure
 */
const collectMessagesAndEnums = (parentKey, structure) => {
  const scheme = { enums: [], messages: [] };
  if (parentKey) Object.assign(scheme, { name: parentKey, fields: [] });

  for (const [key, childStructure] of Object.entries(structure))
    if (childStructure.enums || childStructure.messages) {
      scheme.enums.push(...childStructure.enums);
      scheme.messages.push(...childStructure.messages);
    } else scheme.messages.push(collectMessagesAndEnums(key, childStructure));

  return scheme;
};

/**
 * @param {string} protoFilePath
 * @param {string[]} includeDirs
 */
const load = async (protoFilePath, includeDirs) => {
  let rootFileScheme = {};
  const packagesStructure = {};
  const processedPaths = new Set();
  const pathsForProcessing = [protoFilePath];
  while (pathsForProcessing.length > 0) {
    const pathForProcessing = pathsForProcessing.shift();
    if (processedPaths.has(pathForProcessing)) continue;

    const fileContent = await filesReader.read(pathForProcessing, includeDirs);
    const fileScheme = processFile(packagesStructure, rootFileScheme.package, pathForProcessing, fileContent);
    if (pathForProcessing === protoFilePath) rootFileScheme = fileScheme;

    pathsForProcessing.push(...fileScheme.imports);
    processedPaths.add(pathForProcessing);
  }

  return Object.assign(rootFileScheme, collectMessagesAndEnums(null, packagesStructure));
};

/**
 * @param {string} protoFilePath
 * @param {string[]} includeDirs
 */
const loadSync = (protoFilePath, includeDirs) => {
  let rootFileScheme = {};
  const packagesStructure = {};
  const processedPaths = new Set();
  const pathsForProcessing = [protoFilePath];
  while (pathsForProcessing.length > 0) {
    const pathForProcessing = pathsForProcessing.shift();
    if (processedPaths.has(pathForProcessing)) continue;

    const fileContent = filesReader.readSync(pathForProcessing, includeDirs);
    const fileScheme = processFile(packagesStructure, rootFileScheme.package, pathForProcessing, fileContent);
    if (pathForProcessing === protoFilePath) rootFileScheme = fileScheme;

    pathsForProcessing.push(...fileScheme.imports);
    processedPaths.add(pathForProcessing);
  }

  return Object.assign(rootFileScheme, collectMessagesAndEnums(null, packagesStructure));
};

module.exports = {
  load,
  loadSync
};
