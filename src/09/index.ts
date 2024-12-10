import { Runner } from "../types/runner";
import { input, exampleInput } from "./data/index";
import { Result } from "../types/result";

type ParsedData = {
  gapMap: { index: number; size: number }[];
  fileMap: { index: number; file: number; size: number }[];
  transformed: (number | string)[];
};

const parseData = (rawData: string): ParsedData => {
  return rawData.split("").reduce(
    (acc, char, index) => {
      const size = parseInt(char);
      if (index % 2 === 0) {
        const position = index === 0 ? 0 : Math.floor(index / 2);
        acc.fileMap.push({
          index: acc.transformed.length,
          file: position,
          size,
        });
        for (let i = 0; i < size; i++) {
          acc.transformed.push(position);
        }
      } else {
        acc.gapMap.push({ index: acc.transformed.length, size });
        for (let i = 0; i < size; i++) {
          acc.transformed.push(".");
        }
      }
      return acc;
    },
    { gapMap: [], fileMap: [], transformed: [] }
  );
};

const getNextDateBlockIndex = (
  mutableData: (number | string)[],
  currentIndex: number
): number => {
  let nextIndex = currentIndex;
  while (mutableData[nextIndex] === ".") {
    nextIndex--;
  }
  return nextIndex;
};

const compactDataPartOne = (data: (number | string)[]): (number | string)[] => {
  const mutableData = [...data];
  let nextIndex = getNextDateBlockIndex(mutableData, data.length - 1);
  const compacted = [];
  mutableData.forEach((char, index) => {
    if (char !== ".") {
      compacted.push(char);
    } else if (index >= nextIndex) {
      compacted.push(char);
    } else {
      const nextChar = mutableData[nextIndex];
      mutableData[nextIndex] = ".";
      nextIndex = getNextDateBlockIndex(mutableData, nextIndex - 1);
      compacted.push(nextChar);
    }
  });
  return compacted;
};

const getMatchingFile = (
  reversedFiles: { index: number; file: number; size: number }[],
  gapSize: number,
  gapIndex: number
): { index: number; file: number; size: number } => {
  return reversedFiles.find(
    ({ size, index }) => size <= gapSize && index > gapIndex
  );
};

const compactDataPartTwo = (data: ParsedData): (number | string)[] => {
  const mutableData = [...data.transformed];
  const reversedFiles = data.fileMap.reverse();
  data.gapMap.forEach((gap) => {
    let file = null;
    let gapSize = gap.size;
    let fillIndex = gap.index;
    while (gapSize > 0) {
      file = getMatchingFile(reversedFiles, gapSize, gap.index);

      if (file) {
        reversedFiles.splice(reversedFiles.indexOf(file), 1);
        for (let i = 0; i < file.size; i++) {
          mutableData[file.index + i] = ".";
          mutableData[fillIndex + i] = file.file;
        }
        fillIndex += file.size;
        gapSize -= file.size;
      } else {
        gapSize--;
      }
    }
  });
  return mutableData;
};

const calculateChecksum = (compactedData: (number | string)[]): number => {
  return compactedData.reduce((acc: number, n, index) => {
    if (n === ".") {
      return acc;
    }
    const safe = Number(n as number);
    return acc + safe * index;
  }, 0);
};

export const partOne: Runner = async (dataSetFlag: string): Promise<Result> => {
  const rawInput = dataSetFlag === "example" ? exampleInput : input;
  const ts = performance.now();
  const data = parseData(rawInput);
  // Begin Solution
  const compactedData = compactDataPartOne(data.transformed);
  const result = calculateChecksum(compactedData);
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
  const compactedData = compactDataPartTwo(data);
  const result = calculateChecksum(compactedData);
  // End Solution
  return {
    result: result.toString(),
    time: performance.now() - ts,
  };
};
