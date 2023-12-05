import {prettyPrintSolution, readInputContents, Solution} from "../utils/utils.ts";

class Day5Part1 implements Solution {
    private static readonly CATEGORIES = new Map([
        [0, 'soil'],
        [1, 'fertilizer'],
        [2, 'water'],
        [3, 'light'],
        [4, 'temperature'],
        [5, 'humidity'],
        [6, 'location'],
    ])

    day(): number {
        return 5;
    }

    part(): 1 | 2 {
        return 1;
    }

    input(): number {
        return 2;
    }

    async result(): Promise<string> {
        const rawInput = await readInputContents(this.day(), this.input());
        const split = rawInput.split('\n');
        const seeds: number[] = [];
        const sourceToDestination: Array/*conversions*/<Array/*many-materials*/<[number, number, number]>> = [];

        let newBlock = -1;
        for (let i = 0; i < split.length; i++) {
            const line = split[i];
            if (i === 0) {
                const a = line.split(':')[1].trim().split(' ').map(r => Number(r));
                seeds.push(...a);
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
        console.log(sourceToDestination);
        const locations:number[] = [];
        for (const seed of seeds) {
            console.log(seed);
            let current = seed;
            for (const t of sourceToDestination) {
                current = this.getVal(current, t);
                console.log(current);
            }
            locations.push(current);
            console.log('end');
        }
        // console.log(sourceToDestination);
        // console.log(seeds);
        return Math.min(...locations).toString(10);
    }

    expectedResult(): string {
        return "35";
    }


    getVal(n: number, sourceToDestination: Array<[number, number, number]>): number {
        for (const [dest, source, range] of sourceToDestination) {
            // console.log([dest,source,range]);
            const inc = dest-source;
            if (source <= n && n <= source + range) {
                return n + inc;
            }
        }
        return n;
    }

    private fill(sourceToDestination: Array<[number, number, number]>, line: string) {
        const elements = line.split(' ').map(r => Number(r));
        const destination = elements[0];
        const source = elements[1];
        const range = elements[2];
        sourceToDestination.push([destination, source, range])
        // console.log([destination, source, range])
        // for (let i = 0; i < range; i++) {
        //     sourceToDestination.set(source + i, destination + i)
        // }
    }
}

const solution = new Day5Part1();
await prettyPrintSolution(solution);