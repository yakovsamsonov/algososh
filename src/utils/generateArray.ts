export const generateArray = (
  minValue: number,
  maxValue: number,
  minLength: number,
  maxLength: number = minLength
) => {
  const newArr: Array<number> = [];

  const length =
    Math.floor(Math.random() * (maxLength - minLength)) + minLength;

  for (let i: number = 0; i < length; i++) {
    const el = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
    newArr.push(el);
  }
  return newArr;
};
