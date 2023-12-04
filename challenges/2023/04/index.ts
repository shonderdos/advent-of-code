import getInput from "../../../utils/getInput";

const [, , year, day] = process.argv;
const data = getInput(year, day)
  .trim()
  .split("\n")
  .map((line) => line.split(": ")[1])
  .map((line) => line.split("|"))
  .map((line) => line.map((num) => num.trim()))
  .map((line) => [
    line[0]
      .split(" ")
      .reduce((total, num) => (num ? [...total, num] : total), [] as string[]),
    line[1]
      .split(" ")
      .reduce((total, num) => (num ? [...total, num] : total), [] as string[]),
  ]);

const part1 = () => {
  return data.reduce((points, [winningNumbers, ownNumbers]) => {
    const correctNumbers = ownNumbers.reduce(
      (total, num) => (winningNumbers.includes(num) ? total + 1 : total),
      0
    );
    const pointsForThisLine = Math.pow(2, correctNumbers - 1);
    return pointsForThisLine >= 1 ? points + pointsForThisLine : points;
  }, 0);
};

const part2 = () => {
  const data = getInput(year, day)
    .trim()
    .split("\n")
    .map((line) => line.split(": "))
    .map((line) => [line[0].match(/\d+/)[0], line[1]])
    .map((line) => [line[0], ...line[1].split("|")])
    .map((line) => line.map((num) => num.trim()))
    .map((line) => [
      line[0],
      line[1]
        .split(" ")
        .reduce(
          (total, num) => (num ? [...total, num] : total),
          [] as string[]
        ),
      line[2]
        .split(" ")
        .reduce(
          (total, num) => (num ? [...total, num] : total),
          [] as string[]
        ),
    ]);

  let totalAmountOfCardsProcessed = 0;

  const copy = [...data];

  while (data.length > 0) {
    const [cardNumber, winningNumbers, ownNumbers] = data.shift();

    totalAmountOfCardsProcessed += 1;

    const correctNumbers = ownNumbers.reduce(
      (total, num) => (winningNumbers.includes(num) ? total + 1 : total),
      0
    );
    for (let i = 0; i < correctNumbers; i++) {
      if (copy[Number(cardNumber) + i]) {
        data.unshift(copy[Number(cardNumber) + i]);
      }
    }
  }

  return totalAmountOfCardsProcessed;
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
