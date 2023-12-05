const { splitLines, readFile } = require("../utils");

const data = splitLines(readFile(__dirname));

const limits = {
  red: 12,
  green: 13,
  blue: 14,
};

// Part 1
const parsedData = data.map((line) => {
  const removeGameText = line.slice(5);
  const sets = removeGameText.split(/:\s|;\s/);
  const result = {
    gameId: parseInt(sets.splice(0, 1)[0]),
    sets: [],
  };

  const formattedSets = sets.map((set) => {
    const setArray = set.split(", ");
    return setArray.reduce(
      (prevValue, blocks) => {
        const [total, color] = blocks.split(" ");
        prevValue[color] += parseInt(total);
        return prevValue;
      },
      { green: 0, red: 0, blue: 0 }
    );
  });

  result.sets.push(...formattedSets);

  return result;
});

// console.log("parsedData", parsedData);

const answer1 = parsedData.reduce((possibleGameTotal, game) => {
  const { gameId, sets } = game;
  let isPossible = true;

  sets.forEach((set) => {
    if (isPossible) {
      const { green, red, blue } = set;
      if (green > limits.green || red > limits.red || blue > limits.blue)
        isPossible = false;
    }
  });

  return isPossible ? possibleGameTotal + gameId : possibleGameTotal;
}, 0);

console.log("answer1", answer1);

const answer2 = parsedData.reduce((power, game) => {
  const { sets } = game;

  const { green, red, blue } = sets.reduce(
    (maxValues, set) => {
      const { green, red, blue } = set;
      if (green > maxValues.green) maxValues.green = green;
      if (red > maxValues.red) maxValues.red = red;
      if (blue > maxValues.blue) maxValues.blue = blue;
      return maxValues;
    },
    {
      green: 0,
      red: 0,
      blue: 0,
    }
  );
  power += green * red * blue;
  return power;
}, 0);

console.log("answer2", answer2);
