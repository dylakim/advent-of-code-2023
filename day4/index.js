const { splitLines, readFile } = require("../utils");

const data = splitLines(readFile(__dirname));

console.log(data);

const formattedData = data.map((card) => {
  return card
    .split(/:\s|\s\|\s/)
    .slice(1)
    .map((set) => {
      return set.split(" ").map((num) => parseInt(num));
    });
});

console.log("formatted data", formattedData);

// Part 1
const answer1 = formattedData.reduce((totalPoints, [winningSet, cardSet]) => {
  //   console.log("cardSet", cardSet);
  const cardPoints = cardSet.reduce((points, num) => {
    console.log(
      "winningSet.includes(num)",
      winningSet.includes(num),
      winningSet,
      num
    );
    if (winningSet.includes(num) && !isNaN(num)) {
      if (!points) points = 1;
      else points *= 2;
    }

    return points;
  }, 0);

  return totalPoints + cardPoints;
}, 0);

console.log("answer1", answer1);
