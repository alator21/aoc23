import {
    prettyPrintSolution,
    readInputContents,
    Solution,
} from "../utils/utils.ts";
import {splitBySpaces} from "../utils/StringOperations.ts";
import {sumOfCollection} from "../utils/CollectionOperations.ts";

class Day4Part2 implements Solution {
    day(): number {
        return 4;
    }

    part(): 1 | 2 {
        return 2;
    }

    input(): number {
        return 2;
    }

    async result(): Promise<string> {
        const rawInput = await readInputContents(this.day(), this.input());
        const scratchpads: Map<number, number> = new Map<number/*cardNumber*/, number/*howMany*/>();
        const matchingNumbersPerCard: Map<number, number> = new Map();
        for (const line of rawInput.split('\n')) {
            const parts = line.split('|');
            const firstPart = parts[0].trim();
            const secondPart = parts[1].trim();

            const cardNumber = Number(firstPart.split(':')[0].split(/ +/)[1]);
            const winningNumbersRaw = firstPart.split(':')[1].trim();
            const winningNumbers = splitBySpaces(winningNumbersRaw).map(r => Number(r));
            const pickedNumbers = splitBySpaces(secondPart).map(r => Number(r));


            const matchingNumbers = winningNumbers.filter(r => pickedNumbers.includes(r)).length;
            matchingNumbersPerCard.set(cardNumber, matchingNumbers);
        }

        for (const [cardNumber] of matchingNumbersPerCard.entries()) {
            scratchpads.set(cardNumber, 1);
        }
        for (const [cardNumber, matchingNumbers] of matchingNumbersPerCard.entries()) {
            this.calculateAdditionalScratchpads(scratchpads, matchingNumbersPerCard, cardNumber, matchingNumbers);
        }
        return sumOfCollection(Array.from(scratchpads.values())).toString(10);
    }

    calculateAdditionalScratchpads(scratchpads: Map<number, number>, matchingNumbersPerCard: Map<number, number>, cardNumber: number, matchingNumbers: number): void {
        for (let i = cardNumber + 1; i <= cardNumber + matchingNumbers; i++) {
            this.increaseMap(scratchpads, i);
            if (i > cardNumber) {
                this.calcCopies(scratchpads, matchingNumbersPerCard, i);
            }
        }

    }

    calcCopies(scratchpads: Map<number, number>, matchingNumbersPerCard: Map<number, number>, cardNumber: number): void {
        const matchingNumbers = matchingNumbersPerCard.get(cardNumber);
        if (matchingNumbers === undefined) {
            throw new Error('Should not happen');
        }
        for (let i = cardNumber + 1; i <= cardNumber + matchingNumbers; i++) {
            this.increaseMap(scratchpads, i);
            this.calcCopies(scratchpads, matchingNumbersPerCard, i);
        }
    }

    increaseMap(map: Map<number, number>, key: number, by: number | undefined = 1): void {
        let a = map.get(key);
        if (a === undefined) {
            a = by;
        } else {
            a += by;
        }
        map.set(key, a);
    }

    expectedResult(): string {
        return "23806951";
    }
}

const solution = new Day4Part2();
await prettyPrintSolution(solution);