export async function readInputContents(
    day: number,
    index: number,
): Promise<string> {
    const fileName = `./src/${day}/data/input${index}.txt`;
    return Bun.file(fileName).text();
}

export function isNumber(char: string) {
    return /^\d$/.test(char);
}

export interface Solution {
    day(): number;

    input(): number;

    result(): Promise<string>;

    expectedResult(): string;
}


export async function prettyPrintSolution(solution: Solution): Promise<void> {
    const actualResult = await solution.result();
    const expectedResult = solution.expectedResult();
    console.log(`❤️ ${actualResult} ❤️`);
    const test = actualResult === expectedResult;
    if (test) {
        console.log(`👏 Equal to expected 👏`)
        return;
    }
    console.log(`🥵 Not equal to expected(${expectedResult})  🥵`)
}