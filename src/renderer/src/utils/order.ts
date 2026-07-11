import { MenuAddon } from "@renderer/types/menu";

export function areAddonsEqual(
    first: MenuAddon[],
    second: MenuAddon[]
): boolean {
    if (first.length !== second.length) {
        return false;
    }

    const firstIds = first
        .map(addon => addon.id)
        .sort();

    const secondIds = second
        .map(addon => addon.id)
        .sort();

    return firstIds.every(
        (id, idx) => id === secondIds[idx]
    )
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