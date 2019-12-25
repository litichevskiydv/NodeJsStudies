const Pbf = require("pbf");
const path = require("path");
const { get } = require("dot-prop");
const compile = require("pbf/compile");
const camelCase = require("camelcase");

const schemeLoader = require("./schemeLoader");

const createSerializer = formatter => {
  return arg => {
    const pbf = new Pbf();
    formatter.write(arg, pbf);
    return pbf.finish();
  };
};

const createDeserializer = formatter => {
  return argBuf => {
    const pbf = new Pbf(argBuf);
    return formatter.read(pbf);
  };
};

const createMethodDefinition = (serviceName, methodScheme, formatters) => {
  const requestFormatter = get(formatters, methodScheme.input_type);
  const responseFormatter = get(formatters, methodScheme.output_type);

  return {
    originalName: camelCase(methodScheme.name),
    path: "/" + serviceName + "/" + methodScheme.name,
    requestStream: methodScheme.client_streaming,
    responseStream: methodScheme.server_streaming,
    requestSerialize: createSerializer(requestFormatter),
    requestDeserialize: createDeserializer(requestFormatter),
    responseSerialize: createSerializer(responseFormatter),
    responseDeserialize: createDeserializer(responseFormatter)
  };
};

const createServiceDefinition = (serviceScheme, formatters) => {
  const serviceDefinition = {};
  for (const methodScheme of serviceScheme.methods)
    serviceDefinition[methodScheme.name] = createMethodDefinition(serviceScheme.name, methodScheme, formatters);

  return serviceDefinition;
};

const createPackageDefinition = protoFileScheme => {
  const packageDefinition = {};
  const formatters = compile(protoFileScheme);
  for (const serviceScheme of protoFileScheme.services)
    packageDefinition[serviceScheme.name] = createServiceDefinition(serviceScheme, formatters);

  return packageDefinition;
};

/**
 * @param {string} protoFilePath
 * @param {DefinitionLoadingOptions} [options]
 */
const load = async (protoFilePath, options) => {
  const opts = options || {};
  const includeDirs = (opts.includeDirs || []).concat([path.join(__dirname, "./include/")]);

  return createPackageDefinition(await schemeLoader.load(protoFilePath, includeDirs));
};

/**
 * @param {string} protoFilePath
 * @param {DefinitionLoadingOptions} [options]
 */
const loadSync = (protoFilePath, options) => {
  /**  @type {DefinitionLoadingOptions} */
  const opts = options || {};
  const includeDirs = (opts.includeDirs || []).concat([path.join(__dirname, "./include/")]);

  return createPackageDefinition(schemeLoader.loadSync(protoFilePath, includeDirs));
};

module.exports = {
  load,
  loadSync
};

/**
 * @typedef {Object} DefinitionLoadingOptions
 * @property {string[]} includeDirs Paths to search for imported `.proto` files.
 */
