import {prettyPrintSolution, readInputContents, Solution} from "../utils/utils.ts";

class DayXPart1 implements Solution {
    day(): number {
        return 2;
    }

    part(): 1 | 2 {
        return 1;
    }

    input(): number {
        return 1;
    }

    async result(): Promise<string> {
        const rawInput = await readInputContents(this.day(), this.input());
        for (const line of rawInput.split('\n')) {
        }
        return '42';
    }

    expectedResult(): string {
        return "2369";
    }
}

const solution = new DayXPart1();
await prettyPrintSolution(solution);