// src/utils/parseSimpleMarkdown.js
export async function parseSimpleMarkdown(filePath) {
    const res = await fetch(filePath);
    const text = await res.text();

    const [headingBlock = "", descBlock = ""] = text
        .split("---")
        .map((p) => p.trim());

    const [title = "", subtitle = ""] = headingBlock
        .split("\n")
        .map((line) => line.replace(/^#+\s/, "").trim())
        .filter(Boolean);

    return {
        title,
        subtitle,
        description: descBlock.trim(),
    };
}
