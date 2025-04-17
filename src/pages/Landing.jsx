// src/pages/Landing.jsx
import { useEffect, useRef, useState } from "react";
import PageLayout from "../layouts/PageLayout";
import ScrollRevealSection from "../sections/ScrollRevealSection";
import SplitIntroSide from "../components/SplitIntroSide";
import StackedIntroSide from "../components/StackedIntroSide";
import HeroIntro from "../components/HeroIntro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";

import fgLeft from "../assets/landing/fg-left.png";
import bgLeft from "../assets/landing/bg-left.png";
import fgRight from "../assets/landing/fg-right.png";
import bgRight from "../assets/landing/bg-right.png";
import mobileImg from "../assets/landing/mobile-landing.png";

import { parseLandingMarkdown } from "../utils/parseLandingMarkdown";

export default function Landing() {
    const [hoverRatio, setHoverRatio] = useState(0.5);
    const [hoverEnabled, setHoverEnabled] = useState(false);
    const [content, setContent] = useState(null);
    const targetRatio = useRef(0.5);

    const isMobile = window.innerWidth < 640;

    useEffect(() => {
        parseLandingMarkdown("/content/landing.md").then(setContent);
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => setHoverEnabled(true), 4000);
        return () => clearTimeout(delay);
    }, []);

    useEffect(() => {
        let frameId;
        const animate = () => {
            setHoverRatio((prev) => {
                if (!hoverEnabled) return prev;
                return prev + (targetRatio.current - prev) * 0.01;
            });
            frameId = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(frameId);
    }, [hoverEnabled]);

    const handleMouseMove = (e) => {
        targetRatio.current = e.clientX / window.innerWidth;
    };

    const handleMouseLeave = () => {
        targetRatio.current = 0.5;
    };

    if (!content) return null;

    return (
        <PageLayout
            isLanding={true}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...(isMobile
                ? {
                      introLeft: null,
                      introRight: null,
                      children: (
                          <>
                              <StackedIntroSide
                                  imageSrc={mobileImg}
                                  leftLink="/about"
                                  rightLink="/badminton"
                                  leftTitle={content.left.title}
                                  rightTitle={content.right.title}
                              />
                              <HeroIntro />
                          </>
                      ),
                  }
                : {
                      introLeft: (
                          <SplitIntroSide
                              direction="left"
                              fgSrc={fgLeft}
                              bgSrc={bgLeft}
                              title={content.left.title}
                              subtitle={content.left.subtitle}
                              hoverRatio={hoverRatio}
                              linkTo="/about"
                          />
                      ),
                      introRight: (
                          <SplitIntroSide
                              direction="right"
                              fgSrc={fgRight}
                              bgSrc={bgRight}
                              title={content.right.title}
                              subtitle={content.right.subtitle}
                              hoverRatio={hoverRatio}
                              linkTo="/badminton"
                          />
                      ),
                      children: <HeroIntro />,
                  })}
            after={
                <ScrollRevealSection>
                    <div className="font-mono bg-white mx-auto text-center">
                        <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold flex justify-center items-center gap-3 text-gray-800">
                            <FontAwesomeIcon
                                icon={faNewspaper}
                                className="text-indigo-600 w-6 h-6"
                            />
                            latest news
                        </h3>

                        <div className="h-[2px] w-16 bg-indigo-600 mt-3 mx-auto rounded-full" />

                        <p className="mt-4 text-base sm:text-md text-gray-600">
                            {content.news ||
                                "no news update at the moment. please check back later."}
                        </p>
                    </div>
                </ScrollRevealSection>
            }
        />
    );
}
