const path = require("path");
const fs = require("fs-extra");
const { set } = require("dot-prop");
const protobufSchema = require("protocol-buffers-schema");

/**
 * @param {string} protoFilePath
 * @param {string[]} includeDirs
 * @returns {Promise<Buffer>}
 */
const readFile = async (protoFilePath, includeDirs) => {
  if (path.isAbsolute(protoFilePath)) return fs.readFile(protoFilePath);

  for (const includeDir of includeDirs) {
    const fullPath = path.join(includeDir, protoFilePath);
    if ((await fs.pathExists(fullPath)) === false) continue;

    return fs.readFile(fullPath);
  }

  throw new Error(`File ${protoFilePath} does not exist`);
};

/**
 * @param {string} protoFilePath
 * @param {string[]} includeDirs
 * @returns {Buffer}
 */
const readFileSync = (protoFilePath, includeDirs) => {
  if (path.isAbsolute(protoFilePath)) return fs.readFileSync(protoFilePath);

  for (const includeDir of includeDirs) {
    const fullPath = path.join(includeDir, protoFilePath);
    if (fs.pathExistsSync(fullPath) === false) continue;

    return fs.readFileSync(fullPath);
  }

  throw new Error(`File ${protoFilePath} does not exist`);
};

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
    rootPackageName && rootPackageName !== packageName && (packageName || "").length > 0
      ? `${packageName}.${fileBaseName}`
      : fileBaseName;
  set(packagesStructure, namespaceName, protoFileScheme);

  return protoFileScheme;
};

/**
 * @param {string} parentKey
 * @param {any} structure
 */
const collectMessagesAndEnums = (parentKey, structure) => {
  const scheme = { enums: [], messages: [] };
  Object.assign(scheme, parentKey ? { name: parentKey, fields: [] } : {});

  for (const [key, childStructure] of Object.entries(structure))
    if (childStructure.enums || childStructure.messages) {
      scheme.enums.push(...(childStructure.enums || []));
      scheme.messages.push(...(childStructure.messages || []));
    } else scheme.messages.push(collectMessagesAndEnums(key, childStructure));

  return scheme;
};

const load = async (protoFilePath, includeDirs) => {
  let rootPackageName = null;
  const packagesStructure = {};
  const processedPaths = new Set();
  const pathsForProcessing = [protoFilePath];
  while (pathsForProcessing.length > 0) {
    const pathForProcessing = pathsForProcessing.shift();
    if (processedPaths.has(pathForProcessing)) continue;

    const fileContent = await readFile(pathForProcessing, includeDirs);
    const fileScheme = processFile(packagesStructure, rootPackageName, pathForProcessing, fileContent);
    if (pathForProcessing === protoFilePath) rootPackageName = fileScheme.package;

    pathsForProcessing.push(...(fileScheme.imports || []));
    processedPaths.add(pathForProcessing);
  }

  return collectMessagesAndEnums(null, packagesStructure);
};

const loadSync = (protoFilePath, includeDirs) => {
  let rootPackageName = null;
  const packagesStructure = {};
  const processedPaths = new Set();
  const pathsForProcessing = [protoFilePath];
  while (pathsForProcessing.length > 0) {
    const pathForProcessing = pathsForProcessing.shift();
    if (processedPaths.has(pathForProcessing)) continue;

    const fileContent = readFileSync(pathForProcessing, includeDirs);
    const fileScheme = processFile(packagesStructure, rootPackageName, pathForProcessing, fileContent);
    if (pathForProcessing === protoFilePath) rootPackageName = fileScheme.package;

    pathsForProcessing.push(...(fileScheme.imports || []));
    processedPaths.add(pathForProcessing);
  }

  return collectMessagesAndEnums(null, packagesStructure);
};

module.exports = {
  load,
  loadSync
};
