const http = require('http');
const fs = require('fs');


const fontExts = ["woff2"]// "eot", , "woff", "ttf"];

async function main() {
    const [_, __, getUrl, filename] = process.argv;
    let url = getUrl.replace("https://", "http://");

    await Promise.all(fontExts.map((ext) => download(`${url}`, `${filename}.${ext}`)));
    console.log("All fonts downloaded");
} main();


function download(url, dest) {
    console.log("Download: ", url);
    return new Promise((resolve, reject) => {
        const request = http.get(url, function (response) {
            const file = fs.createWriteStream(dest);
            response.pipe(file);
            file.on('finish', function () {
                resolve(url);
            });
        }).on('error', function (err) { // Handle errors
            reject(err);
        });
    })
};