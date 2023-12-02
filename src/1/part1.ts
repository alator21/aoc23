import {isNumber, prettyPrintSolution, readInputContents, Solution} from "../utils.ts";

class Day1Part1 implements Solution {
    day(): number {
        return 1;
    }

    input(): number {
        return 3;
    }

    async result(): Promise<string> {
        const rawInput = await readInputContents(this.day(), this.input());
        let sum = 0;
        for (const line of rawInput.split('\n')) {
            const firstNumber = this.findFirstNumber(line);
            const lastNumber = this.findLastNumber(line);
            const combination = Number(`${firstNumber}${lastNumber}`);
            if (isNaN(combination)) {
                continue;
            }
            sum += combination;
        }
        return sum.toString(10);
    }

    findFirstNumber(str: string): number | undefined {
        for (const char of str) {
            if (isNumber(char)) {
                return Number(char);
            }
        }
        return undefined;
    }

    findLastNumber(str: string): number | undefined {
        for (let i = str.length - 1; i >= 0; i--) {
            const char = str[i];
            if (isNumber(char)) {
                return Number(char);
            }
        }
        return undefined;
    }

    expectedResult(): string {
        return '55029';
    }

}

const solution = new Day1Part1();
await prettyPrintSolution(solution);