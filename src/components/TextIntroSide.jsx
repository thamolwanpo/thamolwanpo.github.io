// src/components/TextIntroSide.jsx
import { faArrowRight, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

export default function TextIntroSide({
    title,
    subtitle,
    description,
    list,
    variant = "intro",
    className = "",
}) {
    const isIntro = variant === "intro";

    const headingSize = isIntro
        ? "text-5xl sm:text-5xl lg:text-7xl"
        : "text-2xl sm:text-3xl lg:text-4xl";
    const paragraphSize = isIntro
        ? "text-sm sm:text-base"
        : "text-base sm:text-lg";

    return (
        <div
            className={`w-full h-full flex flex-col justify-center items-start text-left font-mono px-6 lg:px-12 ${className}`}
        >
            <h2
                className={`lowercase font-bold text-gray-800 mb-4 ${headingSize}`}
            >
                {title}
            </h2>

            {subtitle && (
                <p className="lowercase text-base sm:text-2xl text-gray-600 mb-2">
                    {subtitle}
                </p>
            )}

            {description && (
                <div
                    className={`lowercase text-gray-500 mb-4 ${paragraphSize}`}
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p: ({ children }) => (
                                <p className="mb-2 leading-relaxed">
                                    {children}
                                </p>
                            ),
                            blockquote: ({ children }) => (
                                <blockquote className="relative pl-10 pr-4 py-4 border-l-4 border-indigo-500 text-gray-700 italic my-6">
                                    <FontAwesomeIcon
                                        icon={faQuoteLeft}
                                        className="absolute left-2 top-4 text-indigo-500"
                                    />
                                    {children}
                                </blockquote>
                            ),
                        }}
                    >
                        {description}
                    </ReactMarkdown>
                </div>
            )}

            {Array.isArray(list) && (
                <ul className="space-y-2">
                    {list.map((item, i) => (
                        <li
                            key={i}
                            className="lowercase font-mono flex items-start gap-2 text-gray-500"
                        >
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                className="mt-1 text-indigo-500 w-3"
                            />
                            <span>
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]} // ✅ use GFM plugin
                                    components={{
                                        a: ({ node, children, ...props }) => {
                                            const isPaperLink =
                                                children === "(paper)";
                                            return (
                                                <a
                                                    {...props}
                                                    className="text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {isPaperLink ? (
                                                        <>
                                                            <FontAwesomeIcon
                                                                icon={faFilePdf}
                                                                className="w-3 h-3"
                                                            />
                                                            <span>
                                                                view paper
                                                            </span>
                                                        </>
                                                    ) : (
                                                        children
                                                    )}
                                                </a>
                                            );
                                        },
                                        p: ({ children }) => (
                                            <span className="block mb-1">
                                                {children}
                                            </span>
                                        ),
                                    }}
                                >
                                    {item}
                                </ReactMarkdown>
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
