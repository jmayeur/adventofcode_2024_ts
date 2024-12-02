import { Day1 } from "./01/index";
import { Day2 } from "./02/index";
import { Day3 } from "./03/index";

const [,,day, part, dataSetFlag] = process.argv;

switch (day) {
    case '1': {
        const day1 = new Day1();
        if (part === '1') {
            day1.partOne(dataSetFlag).then(console.log);
        } else {
            day1.partTwo(dataSetFlag).then(console.log);
        }
        break;
    }
    case '2': {
        const day2 = new Day2();
        if (part === '1') {
            day2.partOne(dataSetFlag).then(console.log);
        } else {
            day2.partTwo(dataSetFlag).then(console.log);
        }
        break;
    }
    case '3': {
        const day3 = new Day3();
        if (part === '1') {
            day3.partOne(dataSetFlag).then(console.log);
        } else {
            day3.partTwo(dataSetFlag).then(console.log);
        }
        break;
    }
}