import getInput from "../../../utils/getInput";

const data = getInput("2020", "6");

const part1 = () => {
  return data
    .split(/\n\n/)
    .map((x) => x.replace(/\n/g, ""))
    .map((string) =>
      [...string].reduce((result, char) => {
        if (!result.includes(char)) {
          result.push(char);
        }

        return result;
      }, [])
    )
    .map((string) => string.length)
    .reduce((count, number) => {
      return count + number;
    }, 0);
};

const part2 = () => {
  return data
    .trim()
    .split(/\n\n/)
    .map((string) => string.split(/\n/))
    .map((groupArray) => {
      if (groupArray.length === 1) groupArray[0].length;

      groupArray.sort();
      const [firstInGroup] = groupArray.splice(0, 1);
      const count = [...firstInGroup].reduce((uniqueLetters, letter) => {
        const everyoneHasThisQuestion = groupArray.every((string) =>
          string.includes(letter)
        );

        if (everyoneHasThisQuestion) {
          uniqueLetters.push(letter);
        }

        return uniqueLetters;
      }, []);

      return count.length;
    })
    .reduce((count, number) => {
      return count + number;
    }, 0);
};

console.log(part1());
console.log(part2());
