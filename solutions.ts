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

// Solution 05
interface Book {
  title: string;
  author: string;
  publishedYear: number;
}

const toggleReadStatus = (obj: Book) => {
  return { ...obj, isRead: true };
};

// Solution 06
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

class Student extends Person {
  grade: string;

  constructor(name: string, age: number, grade: string) {
    super(name, age);
    this.grade = grade;
  }

  getDetails() {
    return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
  }
}

// Solution 07
const getIntersection = (input1: number[], input2: number[]): number[] => {
  const set = new Set(input1);
  const intersection = input2.filter((num) => set.has(num));
  return intersection;
};
