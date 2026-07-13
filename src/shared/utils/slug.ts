export function createSlug(name: string): string {
    return name.trim().toLowerCase().replace(/\s+/g, "-");
}