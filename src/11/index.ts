import { Runner } from "../types/runner";
import { input, exampleInput } from "./data/index";
import { Result } from "../types/result";

const parseData = (rawData: string): number[] => {
  return rawData.split(" ").map(Number);
};

const memo = {};
const processStones = (
  stones: number[],
  depth: number,
  maxDepth: number
): number => {
  if (depth === maxDepth) {
    return stones.length;
  }

  const result = stones.reduce((acc, stone) => {
    const key = `${stone}:${depth}`;
    if (!memo[key]) {
      if (stone === 0) {
        memo[key] = processStones([1], depth + 1, maxDepth) - 1;
      } else {
        const stoneStr = stone.toString();
        if (stoneStr.length % 2 === 0) {
          const half = stoneStr.length / 2;
          const right = parseInt(stoneStr.slice(half));
          const left = parseInt(stoneStr.slice(0, half));
          memo[key] = processStones([left, right], depth + 1, maxDepth) - 1;
        } else {
          memo[key] = processStones([stone * 2024], depth + 1, maxDepth) - 1;
        }
      }
    }
    return acc + memo[key];
  }, 0);

  return result + stones.length;
};

export const partOne: Runner = async (dataSetFlag: string): Promise<Result> => {
  const rawInput = dataSetFlag === "example" ? exampleInput : input;
  const ts = performance.now();
  const data = parseData(rawInput);
  // Begin Solution
  const result = processStones(data, 0, 25);
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
  const result = processStones(data, 0, 75);
  // End Solution
  return {
    result: result.toString(),
    time: performance.now() - ts,
  };
};
