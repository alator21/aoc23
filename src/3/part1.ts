import {isNumber, prettyPrintSolution, readInputContents, Solution, sumOfCollection} from "../utils.ts";

class Day3Part1 implements Solution {
    day(): number {
        return 3;
    }

    part(): 1 | 2 {
        return 1;
    }

    input(): number {
        return 2;
    }

    async result(): Promise<string> {
        const rawInput = await readInputContents(this.day(), this.input());
        // console.log(rawInput);
        const inputAsArray: Array<Array<string>> = this.convertInputToArray(rawInput)
        // console.log(inputAsArray);
        const rows = inputAsArray.length;
        const columns = inputAsArray[0].length;
        const symbolsIndices = this.findSymbolsIndices(inputAsArray);
        // console.log(symbolIndices);
        const goodNumbersPerCoordinate: Map<string, number> = new Map();
        for (const symbol of symbolsIndices) {
            const adjacentIndices = this.findAdjacentIndices(symbol, rows, columns);
            for (const coordinatesOfAdjacentCell of adjacentIndices) {
                const i = coordinatesOfAdjacentCell[0];
                const j = coordinatesOfAdjacentCell[1];
                const valueOfCell = inputAsArray[i][j];
                if (!isNumber(valueOfCell)) {
                    continue;
                }
                // value of cell is a number
                const startingCoordinatesOfNumber = this.findStartingCoordinatesOfNumber(coordinatesOfAdjacentCell, inputAsArray)
                const number = this.findNumberByStartingCoordinates(startingCoordinatesOfNumber, inputAsArray);
                goodNumbersPerCoordinate.set(this.stringifyCoordinates(startingCoordinatesOfNumber), number);
            }
        }
        return sumOfCollection(Array.from(goodNumbersPerCoordinate.values()))
            .toString(10);
    }


    convertInputToArray(input: string): Array<Array<string>> {
        const splitInput = input.split('\n');
        const inputAsArray: Array<Array<string>> = [];
        for (let i = 0; i < splitInput.length; i++) {
            const line = splitInput[i];
            inputAsArray[i] = [];
            for (let j = 0; j < line.length; j++) {
                const r = line.at(j);
                if (r === undefined) {
                    throw new Error('');
                }
                inputAsArray[i][j] = r;
            }
        }
        return inputAsArray;
    }

    findSymbolsIndices(inputAsArray: Array<Array<string>>): Array<[number, number]> {
        const indices: Set<string> = new Set();
        for (let i = 0; i < inputAsArray.length; i++) {
            const row = inputAsArray[i];
            for (let j = 0; j < row.length; j++) {
                const n = row[j];
                if (n === '.' || isNumber(n)) {
                    continue;
                }
                indices.add(this.stringifyCoordinates([i, j]))
            }
        }
        return Array.from(indices).map(r => this.extractCoordinates(r));
    }

    findAdjacentIndices(coordinates: [number, number], rows: number, columns: number): Array<[number, number]> {
        const i = coordinates[0];
        const j = coordinates[1];
        const indices: Set<string> = new Set();
        const up = i - 1;
        const down = i + 1;
        const rowMiddle = i;
        const colMiddle = j;
        const left = j - 1;
        const right = j + 1;
        if (i > 0) {
            indices.add(this.stringifyCoordinates([up, colMiddle]))
            if (j > 0) {
                indices.add(this.stringifyCoordinates([up, left]))
            }
            if (j < columns - 1) {
                indices.add(this.stringifyCoordinates([up, right]))
            }
        }
        if (i < rows - 1) {
            indices.add(this.stringifyCoordinates([down, colMiddle]))
            if (j > 0) {
                indices.add(this.stringifyCoordinates([down, left]));
            }
            if (j < columns - 1) {
                indices.add(this.stringifyCoordinates([down, right]));
            }
        }
        if (j > 0) {
            indices.add(this.stringifyCoordinates([rowMiddle, left]));
        }
        if (j < columns - 1) {
            indices.add(this.stringifyCoordinates([rowMiddle, right]));
        }
        return Array.from(indices).map(r => this.extractCoordinates(r));
    }


    findStartingCoordinatesOfNumber(coordinates: [number, number], input: Array<Array<string>>): [number, number] {
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
        let numberAsString = ``;

        let valueOfCell = input[i][j];
        while (isNumber(valueOfCell)) {
            numberAsString += valueOfCell;
            j++;
            valueOfCell = input[i][j];
        }
        return Number(numberAsString);
    }

    extractCoordinates(r: string): [number, number] {
        const spl = r.split(',');
        const i = spl[0];
        const j = spl[1];
        return [Number(i), Number(j)];
    }

    stringifyCoordinates(coordinates: [number, number]): string {
        return `${coordinates[0]},${coordinates[1]}`;
    }

    expectedResult(): string {
        return "540212";
    }
}

const solution = new Day3Part1();
await prettyPrintSolution(solution);