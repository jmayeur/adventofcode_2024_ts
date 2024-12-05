import { Result } from "./result";

export interface Runner {
  (ataSetFlag: string): Promise<Result>;
}