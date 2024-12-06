#!/usr/bin/env node

const { create } = require("domain");
const fs = require("fs");
const path = require("path");
const dataIndexText = `export * from './example.input';
export * from './input';`;
const defaultIndexText = `import { Runner } from "../types/runner";
import { input, exampleInput } from "./data/index";
import { Result } from "../types/result";

const parseData = (rawData: string): string[] => {
  return rawData.split("\\n");
};

export const partOne: Runner = async (dataSetFlag: string): Promise<Result> => {
  const rawInput = dataSetFlag === "example" ? exampleInput : input;
  const ts = performance.now();
  const data = parseData(rawInput);
  // Begin Solution
  const result = data;
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
  const result = data;
  // End Solution
  return {
    result: result.toString(),
    time: performance.now() - ts,
  };
}
`;

const wrappedDirCreate = (dir) => {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to Create Dir ", dir);
  }
};

const wrappedFileCreate = (file, text) => {
  try {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, text);
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to Create File ", file);
  }
};

const createRootDir = (day, workingDir) => {
  const dir = path.join(workingDir, day);
  console.log(`Creating Dir ${dir}`);
  wrappedDirCreate(dir);
};

const createDataFolder = (workingDir) => {
  const dir = path.join(workingDir, 'data');
  console.log(`Creating Dir ${dir}`);
  wrappedDirCreate(dir);
};

const createIndexFile = (workingDir) => {
    const file = path.join(workingDir, "index.ts");
    console.log(`Creating index file ${file}`);
    wrappedFileCreate(file, defaultIndexText);
};

const createDataFiles = (workingDir) => {
  const testData = path.join(workingDir, "example.input.ts");
  const data = path.join(workingDir, "input.ts");
  const dataIndex = path.join(workingDir, "index.ts");

  console.log(`Creating data file ${testData}`);
  wrappedFileCreate(testData, 'export const exampleInput = ``;');

  console.log(`Creating data file ${data}`);
  wrappedFileCreate(data, 'export const input = ``;');

  console.log(`Creating data index file ${data}`);
  wrappedFileCreate(dataIndex, dataIndexText);
};

const getArgs = (argv) => {
  const args = argv.slice(2);

  if (args.length !== 1) {
    console.error("Usage, create_day.js <day>");
    return null;
  }

  return {
    day: args[0],
  };
};

const args = getArgs(process.argv);
if (args !== null) {
  createRootDir(args.day, './src/');
  const dayFolder = path.join('./src/', args.day);
  const dataFolder = path.join(dayFolder, 'data');
  createIndexFile(dayFolder);
  createDataFolder(dayFolder);
  createDataFiles(dataFolder);
}
