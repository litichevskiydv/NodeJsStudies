const http = require("http");
const fs = require("fs");

let server = http.createServer((request, response) => {
    response.writeHead(200, { "content-type": "text/plain" });

    let fileStream = fs.createReadStream(process.argv[3]);
    fileStream.pipe(response);
});
server.listen(Number(process.argv[2]));
