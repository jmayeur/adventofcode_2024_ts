import { Day } from '../types/day';
import { input, exampleInput } from './data/index';
import { Result } from '../types/result';

const parseData = (rawData: string): number[][] => {
    return rawData.split('\n').map(v => {
        return v.split(' ').map(v1 => parseInt(v1));
    });
};

const isSafe = (report: number[]): boolean => {

    let direction: 'up' | 'down' | undefined;
    return report.reduce((acc, v, i) => {

        if (i === 0) {
            return acc;
        } else {
            if (!acc) {
                return false;
            } else if ((!direction || direction === 'up') && v > report[i - 1] && v <= report[i - 1] + 3) {
                direction = 'up';
                return true;
            } else if ((!direction || direction === 'down') && v < report[i - 1] && v >= report[i - 1] - 3) {
                direction = 'down';
                return true;
            } else {
                return false;
            }
        }
    }, true);
};

export class Day2 implements Day {

    async partOne(dataSetFlag: string): Promise<Result> {
        const rawInput = dataSetFlag === 'example' ? exampleInput : input;
        const ts = performance.now();
        const data = parseData(rawInput);
        // Begin Solution
        const result = data.reduce((acc, v) => {
            if (isSafe(v)) {
                return acc + 1;
            }
            return acc;
        }, 0);
        // End Solution
        return {
            result: result.toString(),
            time: performance.now() - ts
        }
    }

    async partTwo(dataSetFlag: string): Promise<Result> {
        const rawInput = dataSetFlag === 'example' ? exampleInput : input;
        const ts = performance.now();
        const data = parseData(rawInput);
        // Begin Solution
        const result = data.reduce((acc, v) => {
            if (isSafe(v)) {
                return acc + 1;
            } else {
                for (let i = 0; i < v.length; i++) {
                    const modReport = [...v];
                    modReport.splice(i, 1);
                    if (isSafe(modReport)) {
                        return acc + 1;
                    }
                }
                return acc;

            }
        }, 0);
        // End Solution
        return {
            result: result.toString(),
            time: performance.now() - ts
        }
    }

    name = 'Day 2';
}