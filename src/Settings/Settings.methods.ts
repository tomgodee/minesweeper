function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

const getRandomRange = (lower: number, upper: number) =>
  Math.random() * (upper - lower) + lower;

// TODO: Unit test needed
const isDigit = (text: string) => text.match(/^\d+$/);

export { getRandomInt, getRandomRange, isDigit };
