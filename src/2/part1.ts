import {readInputContents} from "../utils.ts";

const rawInput = await readInputContents(2, 2);


const TARGETS: Map<string, number> = new Map([
    ['red', 12],
    ['green', 13],
    ['blue', 14],
]);


const allGames: string[] = [];
const invalidGames: string[] = [];
for (const line of rawInput.split('\n')) {
    // console.log(line);
    const gamePart = line.split(':').at(0);
    if (gamePart === undefined) {
        throw new Error('Could not find game part');
    }
    const gameId = gamePart.split(' ').at(1);
    if (gameId === undefined){
        throw new Error(`Invalid gameId: ${gameId}`)
    }
    allGames.push(gameId);
    // console.log(gameId)
    const game = line.substring(gamePart.length + 1, line.length);

    const rounds = game.split(';').map(r => r.trim())
    // console.log(rounds);
    let revealInvalid = false;
    for (const round of rounds) {
        if (revealInvalid) {
            break;
        }
        const reveals = round.split(',').map(r => r.trim());
        // console.log(reveals)
        for (const reveal of reveals) {
            const [quantityAsString, color] = reveal.split(' ');
            // console.log(quantityAsString, color)

            const targetColorMax = TARGETS.get(color);
            if (targetColorMax === undefined) {
                throw new Error(`wrong color: ${color}`)
            }

            const quantity = Number(quantityAsString);
            if (quantity > targetColorMax) {
                invalidGames.push(gameId);
                revealInvalid = true;
                break;
            }

        }
    }
    // console.log('--')

}
const validGames = allGames.filter(g => !invalidGames.includes(g))
// console.log(allGames);
// console.log(invalidGames)
// console.log(validGames)
const sumOfValidGames = validGames.reduce((partial, n) => partial + Number(n), 0);
console.log(sumOfValidGames)