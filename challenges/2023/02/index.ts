import getInput from "../../../utils/getInput";

const [, , year, day] = process.argv;
const data = getInput(year, day)
  .trim()
  .split("\n")
  .map((line) => {
    let [, message] = line.split(":");
    return message
      .trim()
      .split(";")
      .map((m) =>
        m
          .trim()
          .split(",")
          .map((hand) => hand.trim().split(" "))
      );
  });

const rules = {
  red: 12,
  green: 13,
  blue: 14,
};
const part1 = () => {
  return data.reduce(
    (acceptableGames, game, index) =>
      game.every((hands) =>
        hands.every(([amount, color]) => rules[color] >= amount)
      )
        ? acceptableGames + (index + 1)
        : acceptableGames,
    0
  );
};

const part2 = () => {
  return data.reduce((sum, game) => {
    const lowestNumsObj = game.flat().reduce(
      (gameSum, [amount, color]) => ({
        ...gameSum,
        [color]: Math.max(gameSum[color], amount),
      }),
      { red: 0, green: 0, blue: 0 }
    );
    return (
      Object.values(lowestNumsObj).reduce((total, num) => total * num) + sum
    );
  }, 0);
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
