import {prettyPrintSolution, readInputContents, Solution} from "../utils/utils.ts";
import {cursorTo} from "readline";

class Day5Part2 implements Solution {
    day(): number {
        return 5;
    }

    part(): 1 | 2 {
        return 2;
    }

    input(): number {
        return 2;
    }

    async result(): Promise<string> {
        const rawInput = await readInputContents(this.day(), this.input());
        const split = rawInput.split('\n');
        const seeds: Array<[number, number]> = [];
        const sourceToDestination: Array/*conversions*/<Array/*many-materials*/<[number, number, number]>> = [];

        let newBlock = -1;
        for (let i = 0; i < split.length; i++) {
            const line = split[i];
            if (i === 0) {
                const a = line.split(':')[1].trim().split(' ').map(r => Number(r));
                this.calculateSeeds(seeds, a);
                continue;
            }
            if (line.includes('map')) {
                continue;
            }
            if (line === '') {
                newBlock++;
                continue;
            }
            if (sourceToDestination.at(newBlock) === undefined) {
                sourceToDestination[newBlock] = [];
            }
            this.fill(sourceToDestination[newBlock], line);

        }
        const rangesOfLocations: Array<[number, number]> = [];
        for (const seed of seeds) {
            let current = [seed];
            for (const t of sourceToDestination) {
                current = this.getVal(current, t);
            }
            rangesOfLocations.push(...current);
        }
        const numbers = Array.from(new Set(rangesOfLocations.map(r => r[0])))
            .sort((a, b) => a - b).filter(r => r !== 0);
        return numbers[0].toString(10);
    }

    expectedResult(): string {
        return "2254686";
    }


    getVal(n: Array<[number, number]>, sourceToDestination: Array<[number, number, number]>): Array<[number, number]> {
        const a: Array<[number, number]> = [];
        for (const [seedStart, seedRange] of n) {
            const good: Array<[number, number]> = [];
            this.tt([seedStart, seedRange], good, sourceToDestination)
            a.push(...good);
        }
        return a;
    }

    tt(n: [number, number], good: Array<[number, number]>, sourceToDestination: Array<[number, number, number]>): void {
        const translate = (n: number, [d, s, r]: [number, number, number]) => {
            const inc = d - s;
            if (s <= n && n <= s + r) {
                return n + inc;
            }
            return n;
        }
        let remaining: Array<[number, number]> = [n];
        for (const [seedStart, seedRange] of remaining) {
            for (const [dest, source, range] of sourceToDestination) {
                const lowestOfSeed = seedStart; // 79
                const highestOfSeed = seedStart + seedRange; // 93

                const lowestSource = source; //50
                const highestSource = source + range; //98

                if (highestOfSeed < lowestSource) {
                    continue;
                }
                if (lowestOfSeed > highestSource) {
                    continue;
                }
                const seedLowestThatOverlaps = seedStart > source ? seedStart : source;
                const seedHighestThatOverlaps = seedLowestThatOverlaps + (highestOfSeed < highestSource ? seedRange : /*range*/lowestOfSeed - lowestSource)

                good.push([translate(seedLowestThatOverlaps, [dest, source, range]), seedHighestThatOverlaps - seedLowestThatOverlaps])
                remaining = remaining.filter(([s, r]) => s !== seedStart && r !== seedRange)
                if (seedLowestThatOverlaps - seedStart > 0) {
                    remaining.push([seedStart, seedLowestThatOverlaps - seedStart])
                }
                if (highestOfSeed - highestSource > 0) {
                    remaining.push([seedHighestThatOverlaps, highestOfSeed - highestSource])
                }
            }
        }

        for (const [seedStart, seedRange] of remaining) {
            good.push([seedStart, seedRange])
        }
    }

    private fill(sourceToDestination: Array<[number, number, number]>, line: string) {
        const elements = line.split(' ').map(r => Number(r));
        const destination = elements[0];
        const source = elements[1];
        const range = elements[2];
        sourceToDestination.push([destination, source, range])
    }

    private calculateSeeds(seeds: Array<[number, number]>, input: number[]) {
        for (let i = 0; i < input.length; i += 2) {
            const start = input[i];
            const range = input[i + 1];
            seeds.push([start, range])
        }
    }
}

const solution = new Day5Part2();
await prettyPrintSolution(solution);