import {isNumber, prettyPrintSolution, readInputContents, Solution} from "../utils.ts";

class Day3Part2 implements Solution {
    day(): number {
        return 3;
    }

    part(): 1 | 2 {
        return 2;
    }

    input(): number {
        return 2;
    }

    async result(): Promise<string> {
        const rawInput = await readInputContents(this.day(), this.input());
        // console.log(rawInput);
        const inputAsArray: Array<Array<string>> = [];
        let i = 0;
        for (const line of rawInput.split('\n')) {
            inputAsArray[i] = [];
            for (let j = 0; j < line.length; j++) {
                const r = line.at(j);
                if (r === undefined) {
                    throw new Error('');
                }
                inputAsArray[i][j] = r;
            }
            i++;
        }
        // console.log(inputAsArray);
        const starsIndices = this.findStarsIndices(inputAsArray);
        // console.log(symbolIndices);
        // console.log('--')
        const startOfAllGoodNumbers: Set<string> = new Set();
        const gearRatios: number[] = [];
        for (const s of starsIndices) {
            const startOfNumbersAdjacentToStar: Set<string> = new Set();
            const adjacentIndices = this.findAdjacentIndices(s, inputAsArray.length, inputAsArray[0].length);
            for (const adj of adjacentIndices) {
                const i = adj[0];
                const j = adj[1];
                const a = inputAsArray[i][j];
                if (!isNumber(a)) {
                    continue;
                }
                const b = this.findStartOfNumber(adj, inputAsArray)
                startOfNumbersAdjacentToStar.add(this.tempReverse(b));
                // startOfAllGoodNumbers.add(this.tempReverse(b))
                // console.log('**************')
                // console.log(b);
            }
            if (startOfNumbersAdjacentToStar.size === 2) {
                const numbers = Array.from(startOfNumbersAdjacentToStar)
                    .map(r => {
                        return this.findNumberByStartingCoordinates(this.temp(r), inputAsArray);
                    })

                const gearRatio = numbers.reduce((a, b) => a * b, 1)
                gearRatios.push(gearRatio);
            }

            // console.log(s);
            // console.log(adjacentIndices);
        }
        return gearRatios.reduce((a, b) => a + b, 0).toFixed(10);
    }

    findSymbolsIndices(inputAsArray: Array<Array<string>>): Set<[number, number]> {
        const indices: Set<string> = new Set();
        for (let i = 0; i < inputAsArray.length; i++) {
            const row = inputAsArray[i];
            for (let j = 0; j < row.length; j++) {
                const n = row[j];
                if (n === '.' || isNumber(n)) {
                    continue;
                }
                indices.add(`${i},${j}`);
            }
        }
        return new Set(Array.from(indices).map(r => this.temp(r)));
    }

    findStarsIndices(inputAsArray: Array<Array<string>>): Set<[number, number]> {
        const indices: Set<string> = new Set();
        for (let i = 0; i < inputAsArray.length; i++) {
            const row = inputAsArray[i];
            for (let j = 0; j < row.length; j++) {
                const n = row[j];
                if (n !== '*') {
                    continue;
                }
                indices.add(`${i},${j}`);
            }
        }
        return new Set(Array.from(indices).map(r => this.temp(r)));
    }

    findAdjacentIndices(coordinates: [number, number], rows: number, columns: number): Set<[number, number]> {
        const i = coordinates[0];
        const j = coordinates[1];
        const indices: Set<string> = new Set();
        if (i > 0) {
            indices.add(`${i - 1},${j}`); // up
            if (j > 0) {
                indices.add(`${i - 1},${j - 1}`); // up-left
            }
            if (j < columns - 1) {
                indices.add(`${i - 1},${j + 1}`); // up-right
            }
        }
        if (i < rows - 1) {
            indices.add(`${i + 1},${j}`); // down
            if (j > 0) {
                indices.add(`${i + 1},${j - 1}`); // down-left
            }
            if (j < columns - 1) {
                indices.add(`${i + 1},${j + 1}`); // down-right
            }
        }
        if (j > 0) {
            indices.add(`${i},${j - 1}`); // left
        }
        if (j < columns - 1) {
            indices.add(`${i},${j + 1}`); // right
        }
        return new Set(Array.from(indices).map(r => this.temp(r)));
    }


    findStartOfNumber(coordinates: [number, number], input: Array<Array<string>>): [number, number] {
        const i = coordinates[0];
        let j = coordinates[1];
        while (true) {
            j = j - 1;
            if (j < 0) {
                return [i, j + 1];
            }
            const prev = input[i][j];
            if (!isNumber(prev)) {
                return [i, j + 1]
            }
        }
    }

    findNumberByStartingCoordinates(coordinates: [number, number], input: Array<Array<string>>): number {
        const i = coordinates[0];
        let j = coordinates[1];
        // console.log(i, j);
        let numberAsString = ``;

        let temp = input[i][j];
        // console.log(temp);
        while (isNumber(temp)) {
            numberAsString += temp;
            j++;
            temp = input[i][j];
        }
        return Number(numberAsString);
    }

    temp(r: string): [number, number] {
        const spl = r.split(',');
        const i = spl[0];
        const j = spl[1];
        return [Number(i), Number(j)];
    }

    tempReverse(coordinates: [number, number]): string {
        return `${coordinates[0]},${coordinates[1]}`;
    }

    expectedResult(): string {
        return "467835";
    }
}

const
    solution = new Day3Part2();
await

    prettyPrintSolution(solution);