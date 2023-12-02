import {readInputContents} from "../utils.ts";

const rawInput = await readInputContents(2, 2);


const quantitiesPerColorPerGame: Map<string/*gameId*/, Map<string/*color*/, number/*quantity*/>> = new Map();
for (const line of rawInput.split('\n')) {
    // console.log(line);
    const gamePart = line.split(':').at(0);
    if (gamePart === undefined) {
        throw new Error('Could not find game part');
    }
    const gameId = gamePart.split(' ').at(1);
    if (gameId === undefined) {
        throw new Error(`Invalid gameId: ${gameId}`)
    }
    // console.log(gameId)
    const game = line.substring(gamePart.length + 1, line.length);

    const rounds = game.split(';').map(r => r.trim())
    // console.log(rounds);
    const quantitiesPerColorOfGame: Array<Map<string, number>> = [];
    for (const round of rounds) {
        const reveals = round.split(',').map(r => r.trim());
        // console.log(reveals)
        const quantityPerColor: Map<string, number> = new Map();
        quantitiesPerColorOfGame.push(quantityPerColor)
        for (const reveal of reveals) {
            const [quantityAsString, color] = reveal.split(' ');
            // console.log(quantityAsString, color)
            const quantity = Number(quantityAsString);
            quantityPerColor.set(color, quantity)
        }

    }
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
    quantitiesPerColorPerGame.set(gameId, quantityPerColorNormalized);
    // console.log('--')
}
let sum = 0;
for (const quantityPerColorOfGame of quantitiesPerColorPerGame.values()) {
    const partialSum = Array.from(quantityPerColorOfGame.values()).reduce((partial, n) => partial * n, 1);
    sum += partialSum;
}
console.log(sum);