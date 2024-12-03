import { Result } from "./result";

export interface Day {
  name: string;
  partOne(dataSetFlag: string): Promise<Result>;
  partTwo(dataSetFlag: string): Promise<Result>;
}
