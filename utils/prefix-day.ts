export const prefixDay = (day: string): string => {
  const n = Number(day);
  if (isNaN(n)) throw new Error("day is not a number");
  return n < 10 ? `0${n}` : `${n}`;
};
