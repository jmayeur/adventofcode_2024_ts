import { Runner } from "../types/runner";
import { input, exampleInput } from "./data/index";
import { Result } from "../types/result";

const parseData = (rawData: string): { a: number[]; b: number[] } => {
  return rawData.split("\n").reduce(
    (acc, line) => {
      const [a, b] = line.split("   ");
      acc.a.push(parseInt(a));
      acc.b.push(parseInt(b));
      return acc;
    },
    { a: [] as number[], b: [] as number[] }
  );
};

export const partOne: Runner = async (dataSetFlag: string): Promise<Result> => {
  const rawInput = dataSetFlag === "example" ? exampleInput : input;
  const ts = performance.now();
  const data = parseData(rawInput);
  // Begin Solution
  const a = data.a.sort((a1, b1) => a1 - b1);
  const b = data.b.sort((a2, b2) => a2 - b2);
  const result = a.reduce((acc, v, i) => {
    return acc + Math.abs(v - b[i]);
  }, 0);
  // End Solution
  return {
    result: result.toString(),
    time: performance.now() - ts,
  };
};

export const partTwo: Runner = async (dataSetFlag: string): Promise<Result> => {
  const rawInput = dataSetFlag === "example" ? exampleInput : input;
  const ts = performance.now();
  const data = parseData(rawInput);
  // Begin Solution
  const bMap = data.b.reduce((acc: { [key: number]: number }, b) => {
    if (acc[b]) {
      acc[b] += 1;
    } else {
      acc[b] = 1;
    }
    return acc;
  }, {});
  const result = data.a.reduce((acc, a) => {
    if (bMap[a]) {
      return acc + a * bMap[a];
    }
    return acc;
  }, 0);
  // End Solution
  return {
    result: result.toString(),
    time: performance.now() - ts,
  };
};
