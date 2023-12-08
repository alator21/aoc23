import {prettyPrintSolution, readInputContents, Solution} from "../utils/utils.ts";

class DayXPart1 implements Solution {
    day(): number {
        return 8;
    }

    part(): 1 | 2 {
        return 1;
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
            // console.log(key);
            // console.log(secondPart);
            const sp1 = secondPart[0].trim().substring(1, secondPart[0].trim().length);
            const sp2 = secondPart[1].trim().substring(0, secondPart[1].trim().length - 1);
            // console.log(sp1, sp2);
            t.set(key, [sp1, sp2]);
        }
        let currentKey = 'AAA';
        let steps = 0;
        for (let i = 0; i < instructions.length; i++) {
            // console.log('ccc:',currentKey);
            const instruction = instructions[i];
            // console.log(i,instruction);
            const a = t.get(currentKey);
            if (a === undefined){
                throw new Error('');
            }
            if (instruction === 'L'){
                currentKey = a[0];
            }
            else{
                currentKey = a[1];
            }
            // console.log(`Selecting key: ${currentKey},l:${a[0]},r:${a[1]}`)
            steps++;
            // if (steps === 30){
            //     break;
            // }
            if (currentKey === 'ZZZ'){
                break;
            }


            if (i === instructions.length - 1) {
                i = -1;
            }
        }
        // console.log(steps);
        // console.log(t);
        return steps.toString(10);
    }

    expectedResult(): string {
        return "42";
    }
}

const solution = new DayXPart1();
await prettyPrintSolution(solution);