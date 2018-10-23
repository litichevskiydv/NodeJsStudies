const http = require("http");
const map = require("through2-map");

let server = http.createServer((request, response) => {
    if (request.method === "POST") {
        response.writeHead(200, { "content-type": "text/plain" });
        request.pipe(map(chunk => chunk.toString().toUpperCase())).pipe(response);
    } else return response.end("send me a POST\n");
});
server.listen(Number(process.argv[2]));
