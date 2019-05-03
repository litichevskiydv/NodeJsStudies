const Manipula = require("manipula");
require("./minBy");

console.log(Manipula.from([{ a: 2, b: 3 }, { a: 1, b: 2 }]).minBy(x => x.a));
