import {readInputContents} from "../utils.ts";

const rawInput = await readInputContents(1, 3);

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
    for (const char of str) {
        if (isNumber(char)) {
            return Number(char);
        }
    }
    return undefined;
}

function findLastNumber(str: string): number | undefined {
    for (let i = str.length - 1; i >= 0; i--) {
        const char = str[i];
        if (isNumber(char)) {
            return Number(char);
        }
    }
    return undefined;
}


function isNumber(char: string) {
    return /^\d$/.test(char);
}