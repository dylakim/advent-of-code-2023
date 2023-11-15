const { splitBlankLines, readFile } = require("../utils");

const data = splitBlankLines(readFile(__dirname, 1));

console.log(data);
