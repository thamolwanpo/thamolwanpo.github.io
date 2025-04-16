// src/pages/Landing.jsx
import { useEffect, useRef, useState } from "react";

import PageLayout from "../layouts/PageLayout";
import ScrollRevealSection from "../sections/ScrollRevealSection";
import SplitIntroSide from "../components/SplitIntroSide";

import fgLeft from "../assets/landing/fg-left.png";
import bgLeft from "../assets/landing/bg-left.png";
import fgRight from "../assets/landing/fg-right.png";
import bgRight from "../assets/landing/bg-right.png";

import moblieImg from "../assets/landing/mobile-landing.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import StackedIntroSide from "../components/StackedIntroSide";
import HeroIntro from "../components/HeroIntro";

export default function Landing() {
    const [hoverRatio, setHoverRatio] = useState(0.5);
    const [hoverEnabled, setHoverEnabled] = useState(false);
    const targetRatio = useRef(0.5);

    const handleMouseMove = (e) => {
        const x = e.clientX / window.innerWidth;
        targetRatio.current = x;
    };

    const handleMouseLeave = () => {
        targetRatio.current = 0.5;
    };

    const isMobile = window.innerWidth < 640;

    useEffect(() => {
        const delay = setTimeout(() => {
            setHoverEnabled(true);
        }, 4000); // 4.0 seconds delay

        return () => clearTimeout(delay);
    }, []);

    useEffect(() => {
        let frameId;

        const animate = () => {
            setHoverRatio((prev) => {
                if (!hoverEnabled) return prev;
                const next = prev + (targetRatio.current - prev) * 0.01;
                return next;
            });
            frameId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(frameId);
    }, [hoverEnabled]);

    return (
        <PageLayout
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...(isMobile
                ? {
                      introLeft: null,
                      introRight: null,
                      children: (
                          <>
                              <StackedIntroSide
                                  imageSrc={moblieImg}
                                  leftLink="/about"
                                  rightLink="/badminton"
                                  leftTitle="<ai research>"
                                  rightTitle="badminton coach"
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
                              title="<ai researcher>"
                              subtitle="exploring nlp and ai to understand the world — and improve it."
                              hoverRatio={hoverRatio}
                              linkTo="/about"
                          />
                      ),
                      introRight: (
                          <SplitIntroSide
                              direction="right"
                              fgSrc={fgRight}
                              bgSrc={bgRight}
                              title="badminton coach"
                              subtitle="former world #82, junior national player, and all thailand bronze medalist with a year of experience coaching young athletes."
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
                            news update
                        </h3>

                        <div className="h-[2px] w-16 bg-indigo-600 mt-3 mx-auto rounded-full" />

                        <p className="mt-4 text-base sm:text-md text-gray-600">
                            no news update at the moment. please check back
                            later.
                        </p>
                    </div>
                </ScrollRevealSection>
            }
        ></PageLayout>
    );
}
