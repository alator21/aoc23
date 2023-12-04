export function sumOfCollection(collection: Array<number>): number {
    return collection.reduce((a, b) => a + b, 0);
}

export function productOfCollection(collection: Array<number>): number {
    return collection.reduce((a, b) => a * b, 1)
}
