import {isNumber, readInputContents, Solution} from "../utils.ts";

class Day1Part2 implements Solution {
    private static readonly DIGITS: Map<string, number> = new Map([
        ['one', 1],
        ['two', 2],
        ['three', 3],
        ['four', 4],
        ['five', 5],
        ['six', 6],
        ['seven', 7],
        ['eight', 8],
        ['nine', 9],
    ]);

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
        let digitAsText = ``;
        for (const char of str) {
            if (isNumber(char)) {
                return Number(char);
            }
            digitAsText += char;
            const t = this.textIsDigit(digitAsText);
            if (t !== undefined) {
                return t;
            }

        }
        return undefined;
    }

    findLastNumber(str: string): number | undefined {
        let digitAsText = ``;
        for (let i = str.length - 1; i >= 0; i--) {
            const char = str[i];
            if (isNumber(char)) {
                return Number(char);
            }
            digitAsText = char + digitAsText;
            const t = this.textIsDigit(digitAsText);
            if (t !== undefined) {
                return t;
            }
        }
        return undefined;
    }

    textIsDigit(txt: string): number | undefined {
        for (const digitAsText of Day1Part2.DIGITS.keys()) {
            if (txt.includes(digitAsText)) {
                return Day1Part2.DIGITS.get(digitAsText);
            }
        }
        return undefined;
    }

    expectedResult(): string {
        return '55686';
    }

}

const solution = new Day1Part2();
const actualResult = await solution.result();
const expectedResult = solution.expectedResult();
console.log(`❤️ ${actualResult} ❤️`);
console.log(`Equal to expected: ${actualResult === expectedResult}`)
