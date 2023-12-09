import {prettyPrintSolution, readInputContents, Solution} from "../utils/utils.ts";
import {sumOfCollection} from "../utils/CollectionOperations.ts";

class Day9Part2 implements Solution {
    day(): number {
        return 9;
    }

    part(): 1 | 2 {
        return 2;
    }

    input(): number {
        return 2;
    }

    async result(): Promise<string> {
        const rawInput = await readInputContents(this.day(), this.input());
        const histories: Array<Array<number>> = [];
        for (const line of rawInput.split('\n')) {
            histories.push(line.split(' ').map(r => Number(r)));
        }
        const n: number[] = [];
        for (const h of histories) {
            n.push(this.calc(h));
        }
        // console.log(histories)
        // console.log(n);
        return sumOfCollection(n).toString(10);
        // return '42';
    }

    private calc(h: number[]): number {
        const finalArrays: Array<Array<number>> = [h];
        while (true) {
            const [allZeroes, diff] = this.calc2(h);
            finalArrays.push(diff);
            if (allZeroes) {
                break;
            }
            h = diff;
        }
        // console.log(finalArrays);
        for (let i = finalArrays.length - 1; i >= 1; i--) {
            const finalArray = finalArrays[i];
            const nextArray = finalArrays[i - 1];
            nextArray.unshift(nextArray[0] - finalArray[0])
        }
        // console.log('next', finalArrays)
        return finalArrays[0][0];
    }

    private calc2(h: Array<number>): [boolean, Array<number>] {
        const diff: Array<number> = [];
        for (let i = 0; i < h.length - 1; i++) {
            const h1 = h[i];
            const h2 = h[i + 1];
            diff.push(h2 - h1);
        }
        return [diff.every(r => r === 0), diff];
    }

    expectedResult(): string {
        return "2";
    }
}

const solution = new Day9Part2();
await prettyPrintSolution(solution);