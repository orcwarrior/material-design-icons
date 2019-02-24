const webfont = require("webfont").default;
const fs = require("fs");

const outPath = "./webfont-out/";

webfont({
    files: "./svg-all/baseline/*.svg",
    fontName: "MaterialIcons-Regular",
    glyphTransformFn: obj => {
        obj.name += "_transform";

        return obj;
    },
    normalize: true
}).then(({config, ttf, eot, woff, woff2, svg}) => {
    const basePath = `./webfont-out/${config.fontName}`;

    const formats = {ttf, eot, woff, woff2, svg};
    console.log(Object.keys(formats));
    Object.keys(formats).reduce((r, ext) => {
        console.log(`Writing: ${basePath}.${ext}`);
        const fontWS = fs.createWriteStream(`${basePath}.${ext}`);
        fontWS.write(formats[ext]);
        fontWS.on("finish", () => fontWS.end());
    }, {});
}).then(() => console.log("Generation of font done."));