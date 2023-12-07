import {prettyPrintSolution, readInputContents, Solution} from "../utils/utils.ts";
import {splitBySpaces} from "../utils/StringOperations.ts";
import {sumOfCollection} from "../utils/CollectionOperations.ts";

const cardRank: Map<string, number> = new Map([
    ['A', 0],
    ['K', 1],
    ['Q', 2],
    ['J', 3],
    ['T', 4],
    ['9', 5],
    ['8', 6],
    ['7', 7],
    ['6', 8],
    ['5', 9],
    ['4', 10],
    ['3', 11],
    ['2', 12],
]);

class Day7Part1 implements Solution {
    day(): number {
        return 7;
    }

    part(): 1 | 2 {
        return 1;
    }

    input(): number {
        return 2;
    }

    async result(): Promise<string> {
        const rawInput = await readInputContents(this.day(), this.input());
        const hands: Array<Hand> = [];
        const bids: Array<number> = [];
        for (const line of rawInput.split('\n')) {
            const s = splitBySpaces(line);
            hands.push(new Hand(s[0].split('')));
            bids.push(Number(s[1]));
            // console.log(line);
        }
        const indices = Array.from(hands.keys());
        indices.sort((i1, i2) => hands[i1].compareTo(hands[i2]));
        const sortedHands = indices.map(i => hands[i]);
        const sortedBids = indices.map(i => bids[i]);
        // console.log(sortedHands.map(r => r.cards));
        // console.log(sortedBids);
        const bidsMulByRank: number[] = [];
        for (let i = 0; i < sortedHands.length; i++) {
            const rank = i + 1;
            bidsMulByRank.push(rank * sortedBids[i]);
            // console.log(`${i}, ${rank} * ${sortedBids[i]} = ${rank * sortedBids[i]}`)
        }
        return sumOfCollection(bidsMulByRank).toString(10);

        // return '42';
    }

    expectedResult(): string {
        return "6440";
    }
}

class Hand {
    private readonly _cards: Array<string>;


    constructor(cards: Array<string>) {
        if (cards.length !== 5) {
            throw new Error('');
        }
        this._cards = cards;
    }


    get cards(): Array<string> {
        return this._cards;
    }

    rank(): HandRank {
        const m: Map<string, number> = new Map();
        for (const c of this._cards) {
            let quantity = m.get(c);
            if (quantity === undefined) {
                quantity = 0;
            }
            quantity++;
            m.set(c, quantity);
        }
        const keysArray = Array.from(m.keys());
        if (keysArray.length === 1) {
            return HandRank.FIVE_OF_A_KIND;
        }
        if (keysArray.length === 2) {// [4,1] or [3,2]
            for (const [a, b] of Array.from(m.entries())) {
                if (b === 4) {
                    return HandRank.FOUR_OF_A_KIND;
                }
                if (b === 3) {
                    return HandRank.FULL_HOUSE;
                }
            }
        }
        if (keysArray.length === 3) {// [3,1,1] or [2,2,1]
            for (const [a, b] of Array.from(m.entries())) {
                if (b === 3) {
                    return HandRank.THREE_OF_A_KIND;
                }
                if (b === 2) {
                    return HandRank.TWO_PAIR;
                }
            }
        }
        if (keysArray.length === 4) {
            return HandRank.ONE_PAIR;
        }
        return HandRank.HIGH_CARD;
    }

    compareTo(otherHand: Hand): 0 | 1 | -1 {
        if (this.rank() === otherHand.rank()) {
            for (let i = 0; i < this._cards.length; i++) {
                const thisCardRank = cardRank.get(this._cards[i])!;
                const otherCardRank = cardRank.get(otherHand.cards[i])!;
                if (thisCardRank === otherCardRank) {
                    continue;
                }
                if (thisCardRank < otherCardRank) {
                    return 1;
                }
                return -1;
            }
            return 0;
        }
        if (this.rank() < otherHand.rank()) {
            return 1;
        }
        return -1;
    }
}

enum HandRank {
    FIVE_OF_A_KIND,
    FOUR_OF_A_KIND,
    FULL_HOUSE,
    THREE_OF_A_KIND,
    TWO_PAIR,
    ONE_PAIR,
    HIGH_CARD
}


const solution = new Day7Part1();
await prettyPrintSolution(solution);