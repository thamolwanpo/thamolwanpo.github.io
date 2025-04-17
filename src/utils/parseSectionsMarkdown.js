// src/utils/parseSectionsMarkdown.js
export async function parseSectionsMarkdown(filePath) {
    const res = await fetch(filePath);
    const text = await res.text();

    const rawSections = text
        .split("---")
        .map((s) => s.trim())
        .filter(Boolean);

    const sections = rawSections.map((block) => {
        const lines = block
            .split("\n")
            .map((l) => l) // do not trimEnd or trim at all
            .filter(Boolean);

        const title = lines[0].replace(/^#+\s*/, "");
        const imgMatch = lines[1]?.match(/!\[\]\((.*?)\)/);
        const image = imgMatch ? imgMatch[1] : null;

        const contentLines = lines.slice(imgMatch ? 2 : 1);

        const list = [];
        let currentItem = "";

        for (const line of contentLines) {
            if (line.startsWith("- ")) {
                if (currentItem) list.push(currentItem.trim());
                currentItem = line.slice(2); // remove `- `
            } else if (currentItem) {
                currentItem += "\n" + line;
            }
        }
        if (currentItem) list.push(currentItem.trim());

        const isList = list.length > 0;
        const description = isList ? "" : contentLines.join("\n").trim();

        return {
            title,
            image,
            content: isList ? { description: "", list } : description,
        };
    });

    return sections;
}
