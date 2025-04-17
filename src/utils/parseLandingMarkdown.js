// src/utils/parseLandingMarkdown.js
export async function parseLandingMarkdown(filePath) {
    const res = await fetch(filePath);
    const text = await res.text();

    const parts = text.split("---");
    const [leftBlock = "", rightBlock = "", newsBlock = ""] = parts.map((p) =>
        p.trim()
    );

    const parseBlock = (block) => {
        const lines = block
            .split("\n")
            .map((l) => l.replace(/^#+\s/, "").trim())
            .filter((l) => l.length > 0);
        return [lines[0] || "", lines[1] || ""];
    };

    const [leftTitle, leftSubtitle] = parseBlock(leftBlock);
    const [rightTitle, rightSubtitle] = parseBlock(rightBlock);
    const newsText = (newsBlock || "").replace(/<!--.*?-->/g, "").trim();

    console.log("📦 loaded markdown:", {
        leftTitle,
        leftSubtitle,
        rightTitle,
        rightSubtitle,
        newsText,
    });

    return {
        left: { title: leftTitle, subtitle: leftSubtitle },
        right: { title: rightTitle, subtitle: rightSubtitle },
        news: newsText,
    };
}
