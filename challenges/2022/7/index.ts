import getInput from "../../../utils/getInput";

const testData = getInput("2022", "7")
  .trim()
  .split("\n$ ")
  .slice(1)
  .map((x) => x.split("\n"));

const updateCurrentPath = (dir: string): void => {
  dir === ".." ? currentPath.pop() : currentPath.push(dir);
};
const addDirToTree = (tree, path) =>
  path.length ? addDirToTree(tree[path[0]], path.slice(1)) : tree;

const addSize = (tree) => {
  Object.values(tree).forEach((value) => {
    if (Number.isInteger(value)) {
      tree.SIZE = tree.SIZE ? tree.SIZE + value : value;
    } else {
      tree.SIZE = tree.SIZE ? tree.SIZE + addSize(value) : addSize(value);
    }
  });
  return tree.SIZE;
};

let currentPath: string[] = [];
let tree = {};

function count(tree) {
  let total = 0;

  Object.entries(tree).forEach(([key, value]) => {
    if (value instanceof Object) {
      total += count(value);
      return;
    }
    if (key === "SIZE" && value < 100000) {
      total += value;
    }
  });
  return total;
}

const part1 = () => {
  testData.forEach(([command, ...output]) => {
    if (!output.length) {
      updateCurrentPath(command.split(" ")[1]);
      return;
    }
    output.map((fileOrDir) => {
      const [a, b] = fileOrDir.split(" ");
      if (a === "dir") {
        addDirToTree(tree, currentPath)[b] = {};
        return;
      }
      addDirToTree(tree, currentPath)[b] = Number(a);
    });
  });

  addSize(tree);
  return count(tree);
};

const part2 = () => {
  const isLargeEnough = (size) => {
    return 70000000 - tree.SIZE + size > 30000000;
  };
  let smallestDir = Infinity;

  function findSmallestDir(tree) {
    Object.entries(tree).forEach(([key, value]) => {
      if (value instanceof Object) {
        findSmallestDir(value);
        return;
      }
      if (key === "SIZE" && isLargeEnough(value) && value < smallestDir) {
        smallestDir = value;
      }
    });
  }

  findSmallestDir(tree);

  return smallestDir;
};

console.log(part1());
console.log(part2());
