const path = require("path");
const compile = require("pbf/compile");

const { loadSync } = require("./schemeLoader");

const protoScheme = loadSync(path.join(__dirname, "./example.proto"), [
  path.join(__dirname, "./include/"),
  path.join(__dirname, "../../../node_modules/grpc-tools/bin/")
]);
const HelloRequest = compile(protoScheme).HelloRequest;

console.log(HelloRequest);
