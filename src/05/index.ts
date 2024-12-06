import { Runner } from "../types/runner";
import { input, exampleInput } from "./data/index";
import { Result } from "../types/result";

const parseData = (
  rawData: string
): { updates: number[][]; ordering: Record<number, number[]> } => {
  const [orderingRaw, updatesRaw] = rawData.split("\n\n");
  const updates = updatesRaw
    .split("\n")
    .map((update) => update.split(",").map(Number));
  const ordering = orderingRaw
    .split("\n")
    .map((line) => {
      const [x, y] = line.split("|").map(Number);
      return { x, y };
    })
    .reduce((acc, { x, y }) => {
      if (!acc[x]) {
        acc[x] = [];
      }
      acc[x].push(y);
      return acc;
    }, {});
  return {
    updates,
    ordering,
  };
};

const getOrderedMiddleSum = (
  updates: number[][],
  ordering: Record<number, number[]>
): number => {
  return updates.reduce((acc, update) => {
    if (
      update.reduce((valid, value, index) => {
        if (!valid) {
          return false;
        }
        if (!ordering[value]) {
          return true;
        }
        const y = ordering[value];
        const violations = y.some((yValue) => {
          return update.includes(yValue) && update.indexOf(yValue) < index;
        });
        if (violations) {
          return false;
        }
        return true;
      }, true)
    ) {
      return acc + update[Math.floor(update.length / 2)];
    }
    return acc;
  }, 0);
};

const orderUpdates = (
  updates: number[][],
  ordering: Record<number, number[]>
): number[][] => {
  return updates.map((update) => {
    const ordered = [];
    const left = [...update];
    while (left.length > 0) {
      const next = left.shift();
      const y = ordering[next];
      if (!y) {
        ordered.push(next);
        continue;
      }

      let index = ordered.length;

      y.forEach((value) => {
        if (ordered.includes(value)) {
          const oidx = ordered.indexOf(value);
          if (oidx < index) {
            index = oidx;
          }
        }
      });

      ordered.splice(index, 0, next);
    }
    return ordered;
  });
};

const getUnorderedUpdates = (
  updates: number[][],
  ordering: Record<number, number[]>
): number[][] => {
  return updates.filter((update) => {
    return !update.reduce((valid, value, index) => {
      if (!valid) {
        return false;
      }
      if (!ordering[value]) {
        return true;
      }
      const y = ordering[value];
      const violations = y.some((yValue) => {
        return update.includes(yValue) && update.indexOf(yValue) < index;
      });
      if (violations) {
        return false;
      }
      return true;
    }, true);
  });
};

const getMiddleSums = (ordered: number[][]): number => {
  return ordered.reduce((acc, update) => {
    return acc + update[Math.floor(update.length / 2)];
  }, 0);
};

export const partOne: Runner = async (dataSetFlag: string): Promise<Result> => {
  const rawInput = dataSetFlag === "example" ? exampleInput : input;
  const ts = performance.now();
  const data = parseData(rawInput);
  // Begin Solution
  const result = getOrderedMiddleSum(data.updates, data.ordering);
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
  const unordered = getUnorderedUpdates(data.updates, data.ordering);
  const ordered = orderUpdates(unordered, data.ordering);
  const result = getMiddleSums(ordered);
  // End Solution
  return {
    result: result.toString(),
    time: performance.now() - ts,
  };
};
