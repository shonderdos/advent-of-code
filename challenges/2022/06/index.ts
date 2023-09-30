import getInput from "../../../utils/getInput";

const part1 = () => {
  return getInput("2022", "6")
    .trim()
    .split("")
    .reduce(
      (acc, item, index) => {
        const [storeIndex, store] = acc;
        if (storeIndex) return [storeIndex, store];
        if (store.length === 4) return [index, store];
        if (store.includes(item)) return [storeIndex, [item]];
        store.push(item);
        return [storeIndex, store];
      },
      [0, []] as [number, string[]]
    );
};

const part2 = () => {
  return getInput("2022", "6")
    .trim()
    .split("")
    .reduce(
      (acc, item, index) => {
        const [storeIndex, store] = acc;
        if (storeIndex) return [storeIndex, store];
        if (store.length === 14) return [index, store];
        if (store.includes(item)) {
          const indexOf = store.indexOf(item);
          const newStore = store.splice(indexOf + 1);

          return [storeIndex, [...newStore, item]];
        }
        store.push(item);
        return [storeIndex, store];
      },
      [0, []] as [number, string[]]
    );
};

console.log(part1());
console.log(part2());
