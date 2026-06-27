// Solution 1
const filterEvenNumbers = (arrOfNum: number[]): number[] => {
  const evenNum = arrOfNum.filter((num) => num % 2 === 0);
  return evenNum;
};

// Solution 2
const reverseString = (str: string): string => {
  const reversed = str.split("").reverse().join("");
  return reversed;
};

// Solution 03
type StringOrNumber = string | number;

const checkType = (input: StringOrNumber): StringOrNumber => {
  if (typeof input === "number") {
    return "Number";
  } else {
    return "String";
  }
};

// Solution 04
const getProperty = <X>(obj: X, key: keyof X) => {
  return obj[key];
};

