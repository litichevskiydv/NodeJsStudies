const http = require("http");
const url = require("url");

let server = http.createServer((request, response) => {
    let urlData = url.parse(request.url, true);

    if (urlData.pathname === "/api/parsetime") {
        let date = new Date(urlData.query["iso"]);
        response.writeHead(200, { "content-type": "application/json" });
        response.end(JSON.stringify({ hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds() }));
    } else if (urlData.pathname === "/api/unixtime") {
        let date = new Date(urlData.query["iso"]);
        response.writeHead(200, { "content-type": "application/json" });
        response.end(JSON.stringify({ unixtime: date.getTime() }));
    } else {
        response.writeHead(404);
        response.end();
    }
});
server.listen(Number(process.argv[2]));
