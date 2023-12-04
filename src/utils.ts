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

export function sumOfCollection(coll: Array<number>): number {
    return coll.reduce((a, b) => a + b, 0);
}

export function productOfCollection(coll: Array<number>): number {
    return coll.reduce((a, b) => a * b, 1)
}

export function splitBySpaces(coll: string): string[] {
    return coll.split(/ +/);
}

export interface Solution {
    day(): number;

    part(): 1 | 2;

    input(): number;

    result(): Promise<string>;

    expectedResult(): string;
}


export async function prettyPrintSolution(solution: Solution): Promise<void> {
    console.log(`This is the solution for day ${solution.day()}, part ${solution.part()}, using input ${solution.input()}!`)
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