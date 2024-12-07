import { Runner } from "../types/runner";
import { input, exampleInput } from "./data/index";
import { Result } from "../types/result";

const parseData = (rawData: string): { total: number; factors: number[] }[] => {
  return rawData.split("\n").map((row) => {
    const [rawTotal, rawFactors] = row.split(": ");

    return {
      total: parseInt(rawTotal),
      factors: rawFactors.split(" ").map(Number),
    };
  });
};

const getOperatorPermutations = (
  operators: string[],
  operations: number
): string[][] => {
  if (getOperatorPermutations.cache[operations]) {
    return getOperatorPermutations.cache[operations];
  }
  const result = [];

  if (operations === 0) {
    return [[]];
  }

  const subSet = getOperatorPermutations(operators, operations - 1);

  for (const character of operators) {
    for (const sub of subSet) {
      result.push([character].concat(sub));
    }
  }

  getOperatorPermutations.cache[operations] = result;
  return result;
};
getOperatorPermutations.cache = {};

const isEquationPossible = (
  total: number,
  factors: number[],
  operators: string[]
): number => {
  const operatorPermutations = getOperatorPermutations(
    operators,
    factors.length - 1
  );

  return operatorPermutations.reduce((result, operatorPermutation) => {
    if (result > 0) {
      return result;
    }
    const possibleTotal = factors.reduce((acc, factor, index) => {
      if (acc > total) {
        return acc;
      }
      if (index > 0) {
        const operator = operatorPermutation[index - 1];
        if (operator === "||") {
          return parseInt(acc.toString() + factor.toString());
        } else if (operator === "+") {
          return acc + factor;
        } else if (operator === "*") {
          if (acc === 0) {
            return 1 * factor;
          }
          return acc * factor;
        }
      }
      return acc;
    });

    if (possibleTotal === total) {
      return possibleTotal;
    }
    return 0;
  }, 0);
};

export const partOne: Runner = async (dataSetFlag: string): Promise<Result> => {
  const rawInput = dataSetFlag === "example" ? exampleInput : input;
  const ts = performance.now();
  const data = parseData(rawInput);
  // Begin Solution
  const result = data
    .map(({ total, factors }) => isEquationPossible(total, factors, ["+", "*"]))
    .reduce((a, v) => a + v);
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
  const result = data
    .map(({ total, factors }) =>
      isEquationPossible(total, factors, ["+", "*", "||"])
    )
    .reduce((a, v) => a + v);
  // End Solution
  return {
    result: result.toString(),
    time: performance.now() - ts,
  };
};
