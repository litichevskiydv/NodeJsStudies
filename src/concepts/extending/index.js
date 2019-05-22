const Manipula = require("manipula");

require("./minBy");
require("./stringExtensions");

console.log(Manipula.from([{ a: 2, b: 3 }, { a: 1, b: 2 }]).minBy(x => x.a));

console.log(String.isEmpty(undefined));
console.log(String.isEmpty(null));
console.log(String.isEmpty(""));
console.log(String.isEmpty("test"));
