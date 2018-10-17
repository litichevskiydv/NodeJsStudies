const http = require("http");
const bl = require("bl");

http.get(process.argv[2], response => {
    response.pipe(
        bl((err, data) => {
            if (err) return console.error(err);

            const responseContent = data.toString();
            console.log(responseContent.length);
            console.log(responseContent);
        })
    );
}).on("error", console.error);
