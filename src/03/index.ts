import { Runner } from "../types/runner";
import { input, exampleInput } from "./data/index";
import { Result } from "../types/result";

let enabled = true;
const convert = (str: string): { a: number; b: number } => {
  if (str === "do()") {
    enabled = true;
    return { a: 0, b: 0 };
  } else if (str === "don't()") {
    enabled = false;
    return { a: 0, b: 0 };
  }
  if (!enabled) {
    return { a: 0, b: 0 };
  }
  const matches = str.match(/mul\((\d{1,3}),(\d{1,3})\)/);
  if (!matches || matches.length < 3) {
    return { a: 0, b: 0 };
  }
  return {
    a: parseInt(matches[1], 10),
    b: parseInt(matches[2], 10),
  };
};

const parseData = (
  rawData: string,
  obeyFlags: boolean
): { a: number; b: number }[] => {
  const regEx = obeyFlags
    ? /mul\([^mul]+?\)|do\(\)|don't\(\)/g
    : /mul\([^mul]+?\)/g;
  const matches = rawData.match(regEx);
  return matches.map(convert);
};

export const partOne: Runner = async (dataSetFlag: string): Promise<Result> => {
  const rawInput = dataSetFlag === "example" ? exampleInput : input;
  const ts = performance.now();
  const data = parseData(rawInput, false);
  // Begin Solution
  const result = data.reduce((acc, { a, b }) => acc + a * b, 0);
  // End Solution
  return {
    result: result.toString(),
    time: performance.now() - ts,
  };
};

export const partTwo: Runner = async (dataSetFlag: string): Promise<Result> => {
  const rawInput = dataSetFlag === "example" ? exampleInput : input;
  const ts = performance.now();
  const data = parseData(rawInput, true);
  // Begin Solution
  const result = data.reduce((acc, { a, b }) => acc + a * b, 0);
  // End Solution
  return {
    result: result.toString(),
    time: performance.now() - ts,
  };
};
