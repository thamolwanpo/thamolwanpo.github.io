// src/pages/Badminton.jsx
import { useEffect, useState } from "react";
import PageLayout from "../layouts/PageLayout";
import TextIntroSide from "../components/TextIntroSide";
import ImageSide from "../components/ImageSide";
import ScrollRevealSection from "../sections/ScrollRevealSection";
import { parseSectionsMarkdown } from "../utils/parseSectionsMarkdown";

export default function Badminton() {
    const [sections, setSections] = useState([]);

    useEffect(() => {
        parseSectionsMarkdown("/content/badminton.md").then(setSections);
    }, []);

    if (sections.length === 0) return null;

    const [introSection, ...otherSections] = sections;

    const imageSrc = require(`../assets/badminton/${introSection.image}`);

    const isMobile = window.innerWidth < 640;

    return (
        <PageLayout
            introLeft={
                <TextIntroSide
                    variant="intro"
                    title={introSection.title}
                    subtitle={introSection.content.split("\n")[0]}
                    description={introSection.content
                        .split("\n")
                        .slice(1)
                        .join("\n")}
                />
            }
            introRight={<ImageSide imgSrc={imageSrc} alt="badminton" />}
            after={
                <>
                    {otherSections.map((section, idx) => {
                        const isLast = idx === otherSections.length - 1;
                        const isEven = idx % 2 === 0;
                        const hasImage = section.image && !isMobile;

                        const imageSecSrc = hasImage
                            ? require(`../assets/badminton/${section.image}`)
                            : null;

                        const description =
                            typeof section.content === "string"
                                ? section.content
                                : section.content.description;

                        const list =
                            typeof section.content === "object" &&
                            Array.isArray(section.content.list)
                                ? section.content.list
                                : undefined;

                        return (
                            <ScrollRevealSection key={idx} className="px-6">
                                {isLast || !hasImage ? (
                                    // 🔹 Left-aligned, no image
                                    <div className="w-full max-w-4xl text-left">
                                        <TextIntroSide
                                            variant="section"
                                            title={section.title}
                                            description={description}
                                            list={list}
                                        />
                                    </div>
                                ) : (
                                    // 🔹 Normal two-column layout
                                    <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-8">
                                        {isEven ? (
                                            <>
                                                <ImageSide
                                                    className="flex-1"
                                                    imgSrc={imageSecSrc}
                                                    alt={section.title}
                                                />
                                                <TextIntroSide
                                                    className="flex-1"
                                                    variant="section"
                                                    title={section.title}
                                                    description={description}
                                                    list={list}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <TextIntroSide
                                                    className="flex-1"
                                                    variant="section"
                                                    title={section.title}
                                                    description={description}
                                                    list={list}
                                                />
                                                <ImageSide
                                                    className="flex-1"
                                                    imgSrc={imageSecSrc}
                                                    alt={section.title}
                                                />
                                            </>
                                        )}
                                    </div>
                                )}
                            </ScrollRevealSection>
                        );
                    })}
                </>
            }
        />
    );
}
