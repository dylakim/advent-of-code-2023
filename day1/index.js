const fs = require("fs");
const path = require("path");

const { splitLines, readFile } = require("../utils");

const data = splitLines(readFile(__dirname, 1));
const data2 = splitLines(
  fs.readFileSync(path.join(__dirname, "test2.txt"), "utf-8")
);

console.log(data);

// Part 1
const answer1 = data.reduce((prevValue, line) => {
  const lineArray = line.split("");
  const numbers = lineArray.filter((char) => {
    const stringToInt = parseInt(char);
    if (stringToInt === "NaN") return false;
    return stringToInt;
  });

  const firstNum = numbers[0];
  const lastNum = numbers[numbers.length - 1];

  const lineTotal = firstNum + lastNum;
  return prevValue + parseInt(lineTotal);
}, 0);

console.log("answer 1", answer1);

// Part 2
console.log("data2", data2);
const intWords = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const answer2 = data2.reduce((prevValue, line) => {
  console.log("----");
  // console.log("prevValue", prevValue);
  // console.log("line", line);

  const lineArray = line.split(/(\d)/);
  console.log("lineArray", lineArray);

  const firstResult = lineArray.reduce((prevValue, string) => {
    console.log("prevValue", prevValue);
    // const thing = parseInt(string);
    // console.log("string", string, typeof thing);
    const hasNumberWord = intWords.filter((word) => string.includes(word)); // FIX: this shows results in the order of intWords, not in the order they appear in the string
    console.log("has number word", hasNumberWord);
    if (hasNumberWord.length) prevValue.push(hasNumberWord[0]);
    return prevValue;
  }, []);

  console.log(firstResult);

  //   const numbers = lineArray.filter((char) => {
  //     console.log(parseInt(char));
  //     const stringToInt = parseInt(char);
  //     if (stringToInt === "NaN") return false;
  //     return stringToInt;
  //   });

  //   const firstNum = numbers[0];
  //   const lastNum = numbers[numbers.length - 1];

  //   console.log("firstNum", firstNum);
  //   console.log("lastNum", lastNum);

  //   const lineTotal = firstNum + lastNum;
  //   console.log("lineTotal", lineTotal);
  //   return prevValue + parseInt(lineTotal);
}, 0);

// console.log("answer 2", answer2);
