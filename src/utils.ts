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