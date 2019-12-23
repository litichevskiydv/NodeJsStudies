const fs = require("fs");
const compile = require("pbf/compile");
const protobufSchema = require("protocol-buffers-schema");

const proto = protobufSchema.parse(fs.readFileSync("./example.proto"));
const Line = compile(proto).Line;

console.log(Line);
