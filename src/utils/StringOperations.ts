export function splitBySpaces(s: string): string[] {
    return s.split(/ +/);
}

export function isNumber(s: string) {
    return /^\d$/.test(s);
}
