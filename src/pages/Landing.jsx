import { useEffect, useRef, useState } from 'react';

import PageLayout from '../layouts/PageLayout';
import ScrollRevealSection from '../sections/ScrollRevealSection';
import SplitIntroSide from '../components/SplitIntroSide';

import fgLeft from '../assets/landing/fg-left.png';
import bgLeft from '../assets/landing/bg-left.png';
import fgRight from '../assets/landing/fg-right.png';
import bgRight from '../assets/landing/bg-right.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

export default function Landing() {
  const [hoverRatio, setHoverRatio] = useState(0.5);
  const targetRatio = useRef(0.5);

  const handleMouseMove = (e) => {
    const x = e.clientX / window.innerWidth;
    targetRatio.current = x;
  };

  const handleMouseLeave = () => {
    targetRatio.current = 0.5;
  };

  useEffect(() => {
    let frameId;
  
    const animate = () => {
      setHoverRatio((prev) => {
        const next = prev + (targetRatio.current - prev) * 0.01; // lerp
        return next;
      });
      frameId = requestAnimationFrame(animate);
    };
  
    animate();
  
    return () => cancelAnimationFrame(frameId);
  }, []);
  

  return (
    <PageLayout
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      introLeft={
        <SplitIntroSide
        direction="left"
        fgSrc={fgLeft}
        bgSrc={bgLeft}
        title="ai researcher"
        subtitle="exploring nlp and ai to understand the world — and improve it."
        hoverRatio={hoverRatio}
        linkTo="/about"
        />
      }
      introRight={
        <SplitIntroSide
          direction="right"
          fgSrc={fgRight}
          bgSrc={bgRight}
          title="badminton coach"
          subtitle="Former world #82, junior national player, and all thailand bronze medalist with a year of experience coaching young athletes."
          hoverRatio={hoverRatio}
          linkTo="/badminton"
        />
      }
      after={
        <ScrollRevealSection>
          <div className="font-mono bg-white mx-auto text-center">
            <h3 className="text-3xl sm:text-4xl font-bold flex justify-center items-center gap-3 text-gray-800">
              <FontAwesomeIcon icon={faNewspaper} className="text-indigo-600 w-6 h-6" />
              news update
            </h3>
        
            <div className="h-[2px] w-16 bg-indigo-600 mt-3 mx-auto rounded-full" />
        
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              No news update at the moment. Please check back later.
            </p>
          </div>
        </ScrollRevealSection>      
      }
    >
      <div className="text-center mt-16 mb-20 px-4 font-mono">
        <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-800 leading-tight">
          hi, i’m thamolwan — researcher & badminton coach.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-xl mx-auto">
          welcome to my portfolio, where data and sport come together.
        </p>
      </div>
    </PageLayout>
  );
}
