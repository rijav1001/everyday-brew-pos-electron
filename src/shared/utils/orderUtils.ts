type AddonComparable = {
    id?: string;
    name: string;
    price: number;
}

export function areAddonsEqual(
    first: AddonComparable[],
    second: AddonComparable[]
): boolean {
    if (first.length !== second.length) {
        return false;
    }

    const firstIds = first
        .map(addon => `${addon.name}|${addon.price}`)
        .sort();

    const secondIds = second
        .map(addon => `${addon.name}|${addon.price}`)
        .sort();

    return firstIds.every(
        (addon, idx) => addon === secondIds[idx]
    );
}

export function normalizeNotes(notes: string): string {
    return notes.trim().replace(/\s+/g, " ").toLowerCase();
}

export function formatNotes(notes: string): string {
    return notes
        .trim()
        .replace(/\s+/g, " ")
        .replace(/\b\w/g, letter => letter.toUpperCase());
}