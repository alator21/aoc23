import {prettyPrintSolution, readInputContents, Solution,} from "../utils/utils.ts";
import {splitBySpaces} from "../utils/StringOperations.ts";
import {sumOfCollection} from "../utils/CollectionOperations.ts";

class Day4Part1 implements Solution {
    day(): number {
        return 4;
    }

    part(): 1 | 2 {
        return 1;
    }

    input(): number {
        return 2;
    }

    async result(): Promise<string> {
        const rawInput = await readInputContents(this.day(), this.input());
        const numberOfWinningNumbersPerCard: number[] = [];
        for (const line of rawInput.split('\n')) {
            const parts = line.split('|');
            const firstPart = parts[0].trim();
            const secondPart = parts[1].trim();

            const winningNumbersRaw = firstPart.split(':')[1].trim();
            const winningNumbers = splitBySpaces(winningNumbersRaw).map(r => Number(r));
            const pickedNumbers = splitBySpaces(secondPart).map(r => Number(r));

            numberOfWinningNumbersPerCard.push(winningNumbers.filter(r => pickedNumbers.includes(r)).length)

        }
        // console.log(numberOfWinningNumbersPerCard);
        const calcPerCard = numberOfWinningNumbersPerCard
            .map(r => this.calcResultOfCard(r))
        console.log(calcPerCard)
        return sumOfCollection(calcPerCard).toString(10);
    }

    calcResultOfCard(n: number): number {
        if (n === 0) {
            return 0;
        }
        let result = 1;
        for (let i = 1; i < n; i++) {
            result *= 2;
        }

        return result;
    }


    expectedResult(): string {
        return "20407";
    }
}

const solution = new Day4Part1();
await prettyPrintSolution(solution);