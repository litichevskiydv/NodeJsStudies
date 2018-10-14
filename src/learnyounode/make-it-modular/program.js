let fse = require("./fs-extensions");

fse(process.argv[2], process.argv[3],
    (err, files) =>
    {
        if(err) return console.log(err);
        files.forEach(filePath => console.log(filePath));
    });