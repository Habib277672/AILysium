import { prisma } from "./prisma.js";

// Turns "Muhammad Abdullah" into "muhammadabdullah" — lowercase,
// alphanumeric only, no spaces or special characters, since this is meant
// to be a clean, URL/search-friendly handle, not a display name.
const slugifyName = (fullName) =>
    fullName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "");

// Appends a numeric suffix on collision: "johnsmith", "johnsmith2",
// "johnsmith3", etc. Loops against the DB since usernames must stay
// globally unique.
export const generateUniqueUsername = async (fullName) => {
    const base = slugifyName(fullName) || "user";
    let candidate = base;
    let suffix = 1;

    while (await prisma.user.findUnique({ where: { username: candidate } })) {
        suffix += 1;
        candidate = `${base}${suffix}`;
    }

    return candidate;
};