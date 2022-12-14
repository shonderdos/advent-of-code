import getInput from "../../../utils/getInput";

const data = [
  {
    items: [99n, 67n, 92n, 61n, 83n, 64n, 98n],
    operation: (n: bigint) => n * 17n,
    mod: 3n,
    truthy: 4,
    falsy: 2,
    inspected: 0,
  },
  {
    items: [78n, 74n, 88n, 89n, 50n],
    operation: (n: bigint) => n * 11n,
    mod: 5n,
    truthy: 3,
    falsy: 5,
    inspected: 0,
  },
  {
    items: [98n, 91n],
    operation: (n: bigint) => n + 4n,
    mod: 2n,
    truthy: 6,
    falsy: 4,
    inspected: 0,
  },
  {
    items: [59n, 72n, 94n, 91n, 79n, 88n, 94n, 51n],
    operation: (n: bigint) => n * n,
    mod: 13n,
    truthy: 0,
    falsy: 5,
    inspected: 0,
  },
  {
    items: [95n, 72n, 78n],
    operation: (n: bigint) => n + 7n,
    mod: 11n,
    truthy: 7,
    falsy: 6,
    inspected: 0,
  },
  {
    items: [76n],
    operation: (n: bigint) => n + 8n,
    mod: 17n,
    truthy: 0,
    falsy: 2,
    inspected: 0,
  },
  {
    items: [69n, 60n, 53n, 89n, 71n, 88n],
    operation: (n: bigint) => n + 5n,
    mod: 19n,
    truthy: 7,
    falsy: 1,
    inspected: 0,
  },
  {
    items: [72n, 54n, 63n, 80n],
    operation: (n: bigint) => n + 3n,
    mod: 7n,
    truthy: 1,
    falsy: 3,
    inspected: 0,
  },
];

const part1 = () => {
  const ROUNDS = 20;

  for (let i = 0; i < ROUNDS; i++) {
    data.forEach((monkey) => {
      for (let item of monkey.items) {
        monkey.items = monkey.items.slice(1);
        item = monkey.operation(item) / 3n;
        ++monkey.inspected;

        item % monkey.mod == 0n
          ? data[monkey.truthy].items.push(item)
          : data[monkey.falsy].items.push(item);
      }
    });
  }

  return data
    .map((m) => m.inspected)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((acc, c) => acc * c);
};

const part2 = () => {
  const ROUNDS = 10000;
  const megaMod = data.reduce((v, c) => v * c.mod, 1n);

  for (let i = 0; i < ROUNDS; i++) {
    data.forEach((monkey) => {
      for (let item of monkey.items) {
        monkey.items = monkey.items.slice(1);
        item = monkey.operation(item) % megaMod;
        ++monkey.inspected;

        item % monkey.mod == 0n
          ? data[monkey.truthy].items.push(item)
          : data[monkey.falsy].items.push(item);
      }
    });
  }

  return data
    .map((m) => m.inspected)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((acc, c) => acc * c);
};

// we're manipulating the original data. Only run one part at a time

// console.log(part1());
console.log(part2());
