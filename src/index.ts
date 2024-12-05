import { Result } from "./types/result";

const run = async (): Promise<Result> => {
  const [, , day, part, dataSetFlag] = process.argv;
  const importString =  day.length === 1 ? `./0${day}/index` : `./${day}/index`;
  const runner = await import(importString);
  if (part === "1") {
    return runner.partOne(dataSetFlag);
  } else {
    return runner.partTwo(dataSetFlag);
  }
};

run().then(console.log);
