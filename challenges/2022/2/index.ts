import getInput from "../../../utils/getInput";

const data = getInput("2022", "2")
  .trim()
  .split("\n")
  .map((lines) => lines.split(" "));

const part1 = () => {
  const calculateHandPoints = (ownHand: "X" | "Y" | "Z") => {
    return {
      X: 1,
      Y: 2,
      Z: 3,
    }[ownHand];
  };

  const game = (elfHand: "A" | "B" | "C", ownHand: "X" | "Y" | "Z"): number => {
    const pointsMap = {
      A: 0,
      B: 1,
      C: 2,
      X: 0,
      Y: 1,
      Z: 2,
    };

    if (pointsMap[elfHand] === 2 && pointsMap[ownHand] === 0) {
      return 6;
    }

    if (pointsMap[elfHand] === 0 && pointsMap[ownHand] === 2) {
      return 0;
    }

    return pointsMap[elfHand] < pointsMap[ownHand]
      ? 6
      : pointsMap[elfHand] > pointsMap[ownHand]
      ? 0
      : 3;
  };

  return data
    .map(
      ([elfHand, ownHand]: any) =>
        game(elfHand, ownHand) + calculateHandPoints(ownHand)
    )
    .reduce((total, gamepoints) => total + gamepoints, 0);
};

const part2 = () => {
  const calculateHandPoints = (
    elfHand: "A" | "B" | "C",
    gameResult: "X" | "Y" | "Z"
  ) => {
    const elfHandPoints = { A: 1, B: 2, C: 3 }[elfHand];
    const points = (adding: any): number =>
      [1, 2, 3][(elfHandPoints + adding - 1) % 3];
    return gameResult === "Z"
      ? points(1)
      : gameResult === "Y"
      ? points(0)
      : points(2);
  };

  const game = (gameResult: "X" | "Y" | "Z"): number => {
    return {
      X: 0,
      Y: 3,
      Z: 6,
    }[gameResult];
  };

  return data
    .map(([elfHand, gameResult]: any): number => {
      return game(gameResult) + calculateHandPoints(elfHand, gameResult);
    })
    .reduce((total, gamepoints) => total + gamepoints, 0);
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
