import { Runner } from "../types/runner";
import { input, exampleInput } from "./data/index";
import { Result } from "../types/result";
import { Coordinate } from "../types/Coordinate";

type Bounds = {
  maxX: number;
  maxY: number;
};

const parseData = (rawData: string): number[][] => {
  return rawData
    .split("\n")
    .map((line) => line.split("").map((v) => parseInt(v)));
};

const inBounds = (position: Coordinate, bounds: Bounds): boolean => {
  const { x, y } = position;
  return x >= 0 && x < bounds.maxX && y >= 0 && y < bounds.maxY;
};

const moves: Coordinate[] = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

const countTrails = (
  data: number[][],
  currentPosition: Coordinate,
  currentValue: number,
  bounds: Bounds,
  path: number[],
  visited: Set<string> | undefined
): number[][] => {
  const { x, y } = currentPosition;
  const fullPaths: number[][] = [];

  moves.forEach((direction) => {
    const nextPosition = { x: x + direction.x, y: y + direction.y };

    if (inBounds(nextPosition, bounds)) {
      const nextValue = data[nextPosition.y][nextPosition.x];
      if (nextValue === currentValue + 1) {
        const nPath = path.slice();
        nPath.push(nextValue);

        const key = `${nextPosition.y}|${nextPosition.x};`;
        if (nextValue === 9) {
          if (visited && !visited.has(key)) {
            visited.add(key);
            fullPaths.push(nPath);
          } else if (!visited) {
            fullPaths.push(nPath);
          }
        } else {
          fullPaths.push(
            ...countTrails(
              data,
              nextPosition,
              nextValue,
              bounds,
              nPath,
              visited
            )
          );
        }
      }
    }
  });

  return fullPaths;
};

const startAtTrailHeads = (data: number[][], isPartOne: boolean): number => {
  const bounds = { maxY: data.length, maxX: data[0].length };
  let total = 0;

  for (let y = 0; y < bounds.maxY; y++) {
    for (let x = 0; x < bounds.maxX; x++) {
      if (data[y][x] === 0) {
        const visited = isPartOne ? new Set<string>() : undefined;
        const paths = countTrails(data, { x, y }, 0, bounds, [0], visited);
        if (paths.length) {
          total += paths.length;
        }
      }
    }
  }
  return total;
};

export const partOne: Runner = async (dataSetFlag: string): Promise<Result> => {
  const rawInput = dataSetFlag === "example" ? exampleInput : input;
  const ts = performance.now();
  const data = parseData(rawInput);
  // Begin Solution
  const result = startAtTrailHeads(data, true);
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
  const result = startAtTrailHeads(data, false);
  // End Solution
  return {
    result: result.toString(),
    time: performance.now() - ts,
  };
};
