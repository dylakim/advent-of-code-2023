const { splitLines, readFile } = require("../utils");

const data = splitLines(readFile(__dirname, 1));

console.log(data);

// Part 1
let total = 0;
let partNumber;
let isPartNumber = false;
const splitData = data.map((line) => line.split(""));
console.log(splitData);

splitData.forEach((line, lineIndex) => {
  //   const chars = line.split("");
  console.log("------");
  //   console.log(lineIndex, chars);
  line.forEach((char, charIndex) => {
    // console.log(charIndex, char, parseInt(char));

    if (!isNaN(parseInt(char))) {
      if (partNumber === undefined) partNumber = char;
      else partNumber += char;

      console.log("part number", partNumber);

      //          if isPart is not true
      if (!isPartNumber) {
        //              check for special chars near
        const adjacentChars = [
          line[charIndex - 1],
          line[charIndex + 1],
          splitData[lineIndex - 1]?.[charIndex - 1],
          splitData[lineIndex - 1]?.[charIndex],
          splitData[lineIndex - 1]?.[charIndex + 1],
          splitData[lineIndex + 1]?.[charIndex - 1],
          splitData[lineIndex + 1]?.[charIndex],
          splitData[lineIndex + 1]?.[charIndex + 1],
        ];
        console.log(adjacentChars);
        // same line: -1, +1
        // -1 line: -1 char index, same char index, +1 char index
        // same for +1 line
      }

      const nextChar = line[charIndex + 1];
      //   console.log("next char", !isNaN(parseInt(nextChar)));
      if (isNaN(parseInt(nextChar)) || nextChar === undefined) {
        //   if (isPartNumber) {
        total += parseInt(partNumber);
        partNumber = undefined;
        //   }
      }
    }
  });
});

console.log("total", total);
