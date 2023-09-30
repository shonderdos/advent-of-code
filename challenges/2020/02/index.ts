import getInput from "../../../utils/getInput";

const formattedData = getInput("2020", "2")
  .trim()
  .split("\n")
  .map((split) => {
    return {
      min: /(\d+)-/.exec(split)[1],
      max: /-(\d+)/.exec(split)[1], // possibly doesnt work when there are numbers in the password. adding a '?' might work
      character: /([a-z]+):/.exec(split)[1],
      password: /([a-z]+)$/.exec(split)[1],
    };
  });

const part1 = () => {
  return formattedData.reduce((total, { min, max, character, password }) => {
    const result = password.match(new RegExp(`${character}`, "g"));

    if (result && result.length >= min && result.length <= max) {
      total++;
    }

    return total;
  }, 0);
};

const part2 = () => {
  const formattedData = getInput("2020", "2")
    .trim()
    .split("\n")
    .map((split) => {
      return {
        firstPos: +/(\d+)-/.exec(split)[1] - 1, // add one to compensate for the zero
        secondPos: +/-(\d+)/.exec(split)[1] - 1,
        character: /([a-z]+):/.exec(split)[1],
        password: /([a-z]+)$/.exec(split)[1],
      };
    });
  return formattedData.reduce(
    (total, { firstPos, secondPos, character, password }) => {
      const valuesInPosition = `${password[firstPos] || ""}${
        password[secondPos] || ""
      }`;
      const result = valuesInPosition.match(new RegExp(character, "g"));

      if (result && result.length === 1) {
        total++;
      }

      return total;
    },
    0
  );
};

console.log(part1());
console.log(part2());
