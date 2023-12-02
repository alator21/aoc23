import {prettyPrintSolution, readInputContents, Solution} from "../utils.ts";

class Day2Part2 implements Solution {
    day(): number {
        return 2;
    }

    part(): 1 | 2 {
        return 2;
    }

    input(): number {
        return 2;
    }

    async result(): Promise<string> {
        const rawInput = await readInputContents(this.day(), this.input());
        const quantitiesPerColorPerGame: Array<Map<string/*color*/, number/*quantity*/>> = [];
        for (const line of rawInput.split('\n')) {
            // console.log(line);
            const gamePart = line.split(':').at(0);
            if (gamePart === undefined) {
                throw new Error(`Could not find game part of line: ${line}`);
            }
            const roundsPart = line.substring(gamePart.length + 1, line.length);

            const rounds = roundsPart.split(';').map(r => r.trim())
            const quantitiesPerColorOfGame = this.processRounds(rounds);
            const quantityPerColorNormalized: Map<string, number> = this.normalizeResult(quantitiesPerColorOfGame);

            quantitiesPerColorPerGame.push(quantityPerColorNormalized);
        }
        let sum = 0;
        for (const quantityPerColorOfGame of quantitiesPerColorPerGame) {
            const partialSum = Array.from(quantityPerColorOfGame.values()).reduce((partial, n) => partial * n, 1);
            sum += partialSum;
        }
        return sum.toString(10);
    }

    processRounds(rounds: string[]): Array<Map<string, number>> {
        const quantitiesPerColorOfGame: Array<Map<string, number>> = [];
        for (const round of rounds) {
            const reveals = round.split(',').map(r => r.trim());
            const quantityPerColor = this.processReveals(reveals);
            quantitiesPerColorOfGame.push(quantityPerColor)
        }
        return quantitiesPerColorOfGame;
    }

    processReveals(reveals: string[]): Map<string, number> {
        const quantityPerColor: Map<string, number> = new Map();
        for (const reveal of reveals) {
            const [color, quantity] = this.processReveal(reveal);
            quantityPerColor.set(color, quantity);
        }
        return quantityPerColor;
    }

    processReveal(reveal: string): [string, number] {
        const [quantityAsString, color] = reveal.split(' ');
        const quantity = Number(quantityAsString);
        return [color, quantity];
    }

    normalizeResult(quantitiesPerColorOfGame: Array<Map<string, number>>): Map<string, number> {
        const quantityPerColorNormalized: Map<string, number> = new Map();
        for (const quantityPerColor of quantitiesPerColorOfGame) {
            for (const [color, quantity] of quantityPerColor.entries()) {
                const quantityOfColor = quantityPerColorNormalized.get(color);
                if (quantityOfColor === undefined) {
                    quantityPerColorNormalized.set(color, quantity);
                    continue;
                }
                if (quantity > quantityOfColor) {
                    quantityPerColorNormalized.set(color, quantity);
                }
            }
        }
        return quantityPerColorNormalized;
    }

    expectedResult(): string {
        return "66363";
    }
}

const solution = new Day2Part2();
await prettyPrintSolution(solution);
