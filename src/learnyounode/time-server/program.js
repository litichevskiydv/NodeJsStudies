const net = require("net");
const strftime = require("strftime");

let server = net.createServer(socket => {
    const currentDate = new Date();
    socket.end(strftime("%Y-%m-%d %H:%M") + "\n");
});
server.listen(Number(process.argv[2]));
