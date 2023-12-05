const { splitLines, readFile } = require("../utils");
console.log('__dirname', __dirname);
const data = splitLines(readFile(__dirname, 1));

// console.log(data);

const formattedData = data.map((card) => {
  return card
    .split(/:\s|\s\|\s/)
    .slice(1)
    .reduce(({ winningSet, cardNumbers }, set, index) => {
      const newSet = set.split(" ").reduce((prevValue, num) => {
        const number = parseInt(num);
        if (isNaN(number)) return prevValue;
        return [...prevValue, number];
      }, []);

      if (index) cardNumbers.push(...newSet);
      else winningSet.push(...newSet);

      return { winningSet, cardNumbers };
    }, { winningSet: [], cardNumbers: [] });
});

// Part 1
const answer1 = Object.values(formattedData).reduce((totalPoints, { winningSet, cardNumbers }) => {
  const cardPoints = cardNumbers.reduce((points, num) => {
    if (winningSet.includes(num)) {
      if (!points) points = 1;
      else points *= 2;
    }

    return points;
  }, 0);

  return totalPoints + cardPoints;
}, 0);

console.log("answer1", answer1);

// Part 2
const dataWithCopies = Object.values(formattedData).map(gameCard => {
  return { ...gameCard, copies: 1 }
});

const scratchcards = Object.values(dataWithCopies).reduce((prevValue, { winningSet, cardNumbers, copies }, index) => {

  prevValue += copies;

  const matchingNumbers = cardNumbers.reduce((prevValue, num) => {
    return winningSet.includes(num) ? prevValue += 1 : prevValue;
  }, 0);

  for (let i = 1; i <= matchingNumbers; i++) {
    dataWithCopies[index + i].copies += copies;
  }

  return prevValue;
}, 0)

console.log('scratchcards', scratchcards);