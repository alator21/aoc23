import {readInputContents} from "../utils.ts";

const rawInput = await readInputContents(1, 3);

const DIGITS: Map<string, number> = new Map([
    ['one', 1],
    ['two', 2],
    ['three', 3],
    ['four', 4],
    ['five', 5],
    ['six', 6],
    ['seven', 7],
    ['eight', 8],
    ['nine', 9],
]);

let sum = 0;
for (const line of rawInput.split('\n')) {
    const firstNumber = findFirstNumber(line);
    const lastNumber = findLastNumber(line);
    const combination = Number(`${firstNumber}${lastNumber}`);
    if (isNaN(combination)) {
        continue;
    }
    sum += combination;
}
console.log(sum);

function findFirstNumber(str: string): number | undefined {
    let digitAsText = ``;
    for (const char of str) {
        if (isNumber(char)) {
            return Number(char);
        }
        digitAsText += char;
        const t = textIsDigit(digitAsText);
        if (t !== undefined) {
            return t;
        }

    }
    return undefined;
}

function findLastNumber(str: string): number | undefined {
    let digitAsText = ``;
    for (let i = str.length - 1; i >= 0; i--) {
        const char = str[i];
        if (isNumber(char)) {
            return Number(char);
        }
        digitAsText = char + digitAsText;
        const t = textIsDigit(digitAsText);
        if (t !== undefined) {
            return t;
        }
    }
    return undefined;
}


function isNumber(char: string) {
    return /^\d$/.test(char);
}

function textIsDigit(txt: string): number | undefined {
    for (const digitAsText of DIGITS.keys()) {
        if (txt.includes(digitAsText)) {
            return DIGITS.get(digitAsText);
        }
    }
    return undefined;
}