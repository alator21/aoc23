import {prettyPrintSolution, readInputContents, Solution} from "../utils/utils.ts";

class Day2Part1 implements Solution {
    private static readonly TARGETS: Map<string, number> = new Map([
        ['red', 12],
        ['green', 13],
        ['blue', 14],
    ]);

    private readonly allGames: string[] = [];
    private readonly invalidGames: string[] = [];

    day(): number {
        return 2;
    }

    part(): 1 | 2 {
        return 1;
    }

    input(): number {
        return 2;
    }


    async result(): Promise<string> {
        const rawInput = await readInputContents(this.day(), this.input());
        for (const line of rawInput.split('\n')) {
            // console.log(line);
            const gamePart = line.split(':').at(0);
            if (gamePart === undefined) {
                throw new Error(`Could not find game part of line: ${line}`);
            }
            const gameId = this.extractGameId(gamePart);
            this.allGames.push(gameId);
            // console.log(gameId)
            const roundsPart = line.substring(gamePart.length + 1, line.length);
            const rounds = roundsPart.split(';').map(r => r.trim())
            try {
                this.processRounds(rounds)
            } catch (e) {
                this.invalidGames.push(gameId)
            }

        }
        const validGames = this.allGames.filter(g => !this.invalidGames.includes(g))
        const sumOfValidGames = validGames.reduce((partial, n) => partial + Number(n), 0);
        return sumOfValidGames.toString(10);
    }

    processRounds(rounds: string[]): void {
        for (const round of rounds) {
            const reveals = round.split(',').map(r => r.trim());
            this.processReveals(reveals)
        }
    }

    processReveals(reveals: string[]): void {
        for (const reveal of reveals) {
            this.processReveal(reveal)
        }
    }

    processReveal(reveal: string): void {
        if (this.isRevealInvalid(reveal)) {
            throw new Error('invalid reveal')
        }

    }

    isRevealInvalid(reveal: string): boolean {
        const [quantityAsString, color] = reveal.split(' ');
        // console.log(quantityAsString, color)
        const targetColorMax = Day2Part1.TARGETS.get(color);
        if (targetColorMax === undefined) {
            throw new Error(`wrong color: ${color}`)
        }
        const quantity = Number(quantityAsString);
        return quantity > targetColorMax;
    }

    extractGameId(gamePart: string): string {
        const gameId = gamePart.split(' ').at(1);
        if (gameId === undefined) {
            throw new Error(`Invalid gameId: ${gameId}`)
        }
        return gameId;
    }

    expectedResult(): string {
        return "2369";
    }
}

const solution = new Day2Part1();
await prettyPrintSolution(solution);