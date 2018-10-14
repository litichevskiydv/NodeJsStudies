let fs = require("fs");

let buffer = fs.readFileSync(process.argv[2]);
let fileContent = buffer.toString();
console.log(fileContent.split("\n").length - 1);