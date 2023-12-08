import {prettyPrintSolution, readInputContents, Solution} from "../utils/utils.ts";

class DayXPart1 implements Solution {
    day(): number {
        return 8;
    }

    part(): 1 | 2 {
        return 2;
    }

    input(): number {
        return 2;
    }

    async result(): Promise<string> {
        const rawInput = await readInputContents(this.day(), this.input());
        const s = rawInput.split('\n');
        const instructions: string[] = [];
        const t: Map<string, [string, string]> = new Map();
        for (let i = 0; i < s.length; i++) {
            const line = s[i];
            if (i === 0) {
                instructions.push(...line.split(''));
                continue;
            }
            if (i === 1) {
                continue;
            }
            const strings = line.split('=');
            const key = strings[0].trim();
            const secondPart = strings[1].split(',');
            const sp1 = secondPart[0].trim().substring(1, secondPart[0].trim().length);
            const sp2 = secondPart[1].trim().substring(0, secondPart[1].trim().length - 1);
            t.set(key, [sp1, sp2]);
        }
        let currentKeys: string[] = [];
        for (const [k, v] of t.entries()) {
            if (k.match(/A$/)) {
                currentKeys.push(k);
            }
        }
        console.log(currentKeys);
        const steps = currentKeys.map(key => {
            let counter = 0
            while (true) {
                const instruction = instructions[counter++ % instructions.length]
                const val = t.get(key)!;
                key = instruction === 'L' ? val[0] : val[1];
                if (key.match(/Z$/)) {
                    break
                }
            }
            return counter
        }).reduce((a, b) => lcm(a, b), 1)
        return steps.toString(10);
    }

    expectedResult(): string {
        return "16342438708751";
    }
}

const solution = new DayXPart1();
await prettyPrintSolution(solution);

function gcd(a: number, b: number): number {
    // Helper function to calculate the greatest common divisor (GCD)
    return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
    // LCM can be calculated using the formula: LCM(a, b) = (a * b) / GCD(a, b)
    return (a * b) / gcd(a, b);
}