const http = require("http");
const bl = require("bl");

let contents = [];
function downloadContent(url, next) {
    http.get(url, response => {
        response.pipe(
            bl((err, data) => {
                if (err) return console.error(err);

                contents.push(data.toString());
                next();
            })
        );
    }).on("error", console.error);
}

downloadContent(process.argv[2], () =>
    downloadContent(process.argv[3], () =>
        downloadContent(process.argv[4], () => contents.forEach(x => console.log(x)))
    )
);
