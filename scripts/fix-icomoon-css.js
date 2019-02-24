const fs = require("fs");
const path = require("path");
const {promisify} = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const fastGlob = require('fast-glob');

/* DK: Scripts transform content of icomoon generated style.css by:
*
-> making icons selector more distinctive (adds material-icons.(theme))
-> simplify use of double-color icons to use before & after
* (it's nice to make it that way as MD icons are max 2 colored)  */
async function transformStylesheetCSS(path) {
    const themeCSS = _getThemeCSSName(path, ".");
    const stylesheetContent = await readFile(path, "utf8");
    const makeColorInherited = [/color:.+/gi, /*->*/  "color: inherit;"];
    const rulePath1Rgx = [/(\.[\w\-\.]+)( \.path1.+) {/gi, /*->*/  "$1:before {"];
    const rulePath2Rgx = [/(\.[\w\-\.]+)( \.path2.+) {/gi, /*->*/  "$1:after {"];
    const changeFontPath = ["fonts/MaterialIcons", /*->*/  "MaterialIcons"];
    const mainIconsSelector = ["i, .icomoon-liga {", /*->*/  `i.material-icons${themeCSS} {`];

    return stylesheetContent
        .replace(...mainIconsSelector)
        .replace(...makeColorInherited)
        .replace(...changeFontPath)
        .replace(...rulePath1Rgx)
        .replace(...rulePath2Rgx);
}

async function saveTransformedStylesheet(orgPath, content) {
    const themeCSS = _getThemeCSSName(orgPath, "-");
    const dest = orgPath.replace("style.css", `material-icons${themeCSS}.css`);
    await writeFile(dest, content);
    return dest; // DK: I only care about saved file path
}

function _getThemeCSSName(path, prefix) {
    const theme = path.split("/").slice(-2)[0];
    return (theme === "filled") ? "" : `${prefix}${theme.toLowerCase()}`;
}

async function main() {
    const icomoonStylesheets = await fastGlob.async(['../icomoon-fonts/**/style.css']);
    const transformTasks = icomoonStylesheets.map(async sheetsPath => {
        const transformed = await transformStylesheetCSS(sheetsPath);
        return await saveTransformedStylesheet(sheetsPath, transformed);
    });
    await Promise.all(transformTasks);
    console.log("CSS Transformation tasks done: ", transformTasks);
}

main();