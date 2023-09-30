import { prefixDay } from "./prefix-day";

const { readFileSync } = require("fs");

export default function readInputFile(year: string, day: string): string {
  const prefixedDay = prefixDay(day);
  return readFileSync(`challenges/${year}/${prefixedDay}/input.txt`, "utf-8");
}
