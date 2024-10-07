export const sumArr = (...arg: number[]) => {
  return arg.reduce((a, b) => a + b, 0);
};
