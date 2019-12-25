const path = require("path");

const { loadSync } = require("./loaders/packageDefinitionLoader");

const packageDefinition = loadSync(path.join(__dirname, "./example.proto"));
console.log(packageDefinition);
