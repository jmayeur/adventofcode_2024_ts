import { Day } from '../types/day';
import { input, example_input } from './data/index';
import { Result } from '../types/result';

const parseData = (input: string): { a: number[], b: number[] } => {
    return input.split('\n').reduce((acc, line) => {
        const [a, b] = line.split('   ');
        acc.a.push(parseInt(a));
        acc.b.push(parseInt(b));
        return acc
    }, { a: [] as number[], b: [] as number[] });
};

export class Day1 implements Day {
    async partOne(dataSetFlag: string): Promise<Result> {
        const rawInput = dataSetFlag === 'example' ? example_input : input;
        const ts = performance.now();
        const data = parseData(rawInput);
        // Begin Solution
        const a = data.a.sort((a, b) => a - b);
        const b = data.b.sort((a, b) => a - b);
        const result = a.reduce((acc, a, i) => {
            return acc + Math.abs(a - b[i])
        }, 0);
        // End Solution
        return {
            result: result.toString(),
            time: performance.now() - ts
        }
    }
    async partTwo(dataSetFlag: string): Promise<Result> {
        const rawInput = dataSetFlag === 'example' ? example_input : input;
        const ts = performance.now();
        const data = parseData(rawInput);
        // Begin Solution
        const bMap = data.b.reduce((acc: { [key: number]: number }, b) => {
            if (acc[b]) {
                acc[b] += 1;
            } else {
                acc[b] = 1;
            }
            return acc;
        }, {});
        const result = data.a.reduce((acc, a) => {
            if (bMap[a]) {
                return acc + a * bMap[a];
            }
            return acc;
        }, 0);
        // End Solution
        return {
            result: result.toString(),
            time: performance.now() - ts
        }
    }

    name = 'Day 1';
}