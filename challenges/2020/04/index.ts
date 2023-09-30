import getInput from "../../../utils/getInput";
const data = getInput("2020", "4").trim().split("\n\n");
const requiredPassportFields = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
];
const part1 = () => {
  return data.reduce((store, currentPassport) => {
    return requiredPassportFields.every((x) => currentPassport.includes(x))
      ? ++store
      : store;
  }, 0);
};

const part2 = () => {
  const validators = {
    byr: (birthYear) => birthYear >= 1920 && birthYear <= 2002,
    iyr: (issueYear) => issueYear >= 2010 && issueYear <= 2020,
    eyr: (expYear) => expYear >= 2020 && expYear <= 2030,
    hgt: (height) => {
      const integer = height.slice(0, -2);
      return height.includes("cm")
        ? integer >= 150 && integer <= 193
        : integer >= 59 && integer <= 76;
    },
    hcl: (hairColor) => hairColor.match(/^#[a-f0-9]{6}$/),
    ecl: (eyeColor) =>
      ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(eyeColor),
    pid: (passportId) => passportId.match(/^[0-9]{9}$/),
    cid: () => true,
  };
  const arrayOfPassports = data
    .filter((store) => {
      return requiredPassportFields.every((key) => store.includes(key));
    })
    .map((passport) => passport.split(/\n|\s/))
    .filter((passport) => {
      return passport.every((entry) => {
        const [key, value] = entry.split(":");
        return validators[key](value);
      });
    });
  return arrayOfPassports.length;
};

console.log(part1());
console.log(part2());
