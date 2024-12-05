import { Runner } from "../types/runner";
import { input, exampleInput } from "./data/index";
import { Result } from "../types/result";

const parseData = (rawData: string): string[][] => {
  return rawData.split("\n").map((r) => r.split(""));
};

const get = (
  data: string[][],
  rowIndex: number,
  colIndex: number,
  rowModifier: number,
  colModifier: number
): string => {
  let r = rowIndex;
  let c = colIndex;
  let i = 0;
  let word = "";

  while (r >= 0 && c >= 0 && r < data.length && c < data[r].length && i < 4) {
    word += data[r][c];
    r += rowModifier;
    c += colModifier;
    i++;
  }
  return word;
};

const getWords = (data: string[][]): string[] => {
  return data.reduce((rowAccumulator, row, rowIndex) => {
    const words = row.reduce((colAccumulator, cell, colIndex) => {
      if (cell !== "X") {
        return colAccumulator;
      }
      colAccumulator.push(get(data, rowIndex, colIndex, -1, 0));
      colAccumulator.push(get(data, rowIndex, colIndex, 1, 0));
      colAccumulator.push(get(data, rowIndex, colIndex, 0, -1));
      colAccumulator.push(get(data, rowIndex, colIndex, 0, 1));
      colAccumulator.push(get(data, rowIndex, colIndex, -1, -1));
      colAccumulator.push(get(data, rowIndex, colIndex, -1, 1));
      colAccumulator.push(get(data, rowIndex, colIndex, 1, -1));
      colAccumulator.push(get(data, rowIndex, colIndex, 1, 1));
      return colAccumulator;
    }, []);
    return rowAccumulator.concat(words);
  }, []);
};

const countCrosses = (data: string[][], aRow: number, aCol: number): number => {
  const upLeft = data[aRow - 1][aCol - 1];
  const upRight = data[aRow - 1][aCol + 1];
  const downLeft = data[aRow + 1][aCol - 1];
  const downRight = data[aRow + 1][aCol + 1];

  let mas = 0;

  if (upLeft === "M" && downRight === "S") {
    mas++;
  }
  if (upLeft === "S" && downRight === "M") {
    mas++;
  }

  if (upRight === "M" && downLeft === "S") {
    mas++;
  }
  if (upRight === "S" && downLeft === "M") {
    mas++;
  }

  return mas == 2 ? 1 : 0;
};

const getCount = (data: string[][]): number => {
  let count = 0;
  for (let r = 1; r < data.length - 1; r++) {
    for (let c = 1; c < data[r].length - 1; c++) {
      if (data[r][c] === "A") {
        count += countCrosses(data, r, c);
      }
    }
  }
  return count;
};

export const partOne: Runner = async (dataSetFlag: string): Promise<Result> => {
  const rawInput = dataSetFlag === "example" ? exampleInput : input;
  const ts = performance.now();
  const data = parseData(rawInput);
  // Begin Solution
  const result = getWords(data).filter((w) => w === "XMAS").length;
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
  const result = getCount(data);
  // End Solution
  return {
    result: result.toString(),
    time: performance.now() - ts,
  };
};
