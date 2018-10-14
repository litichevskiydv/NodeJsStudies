let fs = require("fs");
let path = require("path");

module.exports = function filteredLs(directoryPath, extension, callback){
    let fileExtension = "." + extension;
    fs.readdir(directoryPath, 
        (err, files) =>
        {
            if(err) return callback(err);
            callback(null, files.filter(filePath => path.extname(filePath) === fileExtension));
        });
    }