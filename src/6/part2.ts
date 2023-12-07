import {prettyPrintSolution, readInputContents, Solution} from "../utils/utils.ts";
import {splitBySpaces} from "../utils/StringOperations.ts";
import {productOfCollection} from "../utils/CollectionOperations.ts";

class Day6Part2 implements Solution {
    day(): number {
        return 6;
    }

    part(): 1 | 2 {
        return 2;
    }

    input(): number {
        return 2;
    }

    async result(): Promise<string> {
        const times: number[] = [];
        const distances: number[] = [];
        const rawInput = await readInputContents(this.day(), this.input());
        for (const line of rawInput.split('\n')) {
            if (line.includes('Time')) {
                const t = splitBySpaces(line.split(':')[1].trim()).map(r => Number(r));
                times.push(Number(t.reduce((partial, current) => partial+current, '')));
            }
            if (line.includes('Distance')) {
                const t = splitBySpaces(line.split(':')[1].trim()).map(r => Number(r));
                distances.push(Number(t.reduce((partial, current) => partial+current, '')));
            }
        }

        const combinations: number[] = [];
        for (let i = 0; i < times.length; i++) {
            const time = times[i];
            const distance = distances[i];
            const numberOfCombinationsToBeatIt = this.calculateNumberOfCombinationsToBeatIt(time, distance);
            combinations.push(numberOfCombinationsToBeatIt);
        }
        return productOfCollection(combinations).toString(10);
    }

    expectedResult(): string {
        return "39594072";
    }

    private calculateNumberOfCombinationsToBeatIt(time: number, distance: number): number {
        let counter = 0;
        for (let i = 1; i < time - 1; i++) {
            const currentSpeed = i * (time - i);
            if (currentSpeed > distance) {
                counter++;
            }
        }
        return counter;
    }
}

const solution = new Day6Part2();
await prettyPrintSolution(solution);