import getInput from "../../../utils/getInput";

const [, , year, day] = process.argv;
const data = getInput(year, day).trim().split("");

const part1 = () => {
  const start = { x: 0, y: 0 };
  const store = new Set<string>();
  store.add(`${start.x},${start.y}`);
  data.forEach((direction) => {
    switch (direction) {
      case "^":
        start.y++;
        break;
      case "v":
        start.y--;
        break;
      case ">":
        start.x++;
        break;
      case "<":
        start.x--;
        break;
    }
    store.add(`${start.x},${start.y}`);
  });
  return store.size;
};

const part2 = () => {
  const locations = {
    santa: { x: 0, y: 0 },
    robot: { x: 0, y: 0 },
  };
  const store = new Set<string>();
  store.add(`${locations.santa.x},${locations.santa.y}`);

  data.forEach((direction, index) => {
    const current = index % 2 === 0 ? locations.santa : locations.robot;
    switch (direction) {
      case "^":
        current.y++;
        break;
      case "v":
        current.y--;
        break;
      case ">":
        current.x++;
        break;
      case "<":
        current.x--;
        break;
    }
    store.add(`${current.x},${current.y}`);
  });

  return store.size;
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
