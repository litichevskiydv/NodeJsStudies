let fs = require("fs");
let path = require("path");

let fileExtension = "." + process.argv[3];
fs.readdir(process.argv[2],
    (err, files) => {
        if(err) return console.log(err);

        let matcheFiles = files.filter(filePath => path.extname(filePath) === fileExtension);
        matcheFiles.forEach(filePath => console.log(filePath));
    });