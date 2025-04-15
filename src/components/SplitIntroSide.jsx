import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function SplitIntroSide({ direction = 'left', fgSrc, bgSrc, title, subtitle, hoverRatio, linkTo }) {
  const fgControls = useAnimation();
  const bgControls = useAnimation();
  const [showText, setShowText] = useState(false);

  const buffer = 0.5; // small overlap

  const clipValue = direction === 'left'
  ? `inset(0 ${hoverRatio * 100 - buffer}vw 0 0)`
  : `inset(0 0 0 ${(1 - hoverRatio) * 100 - buffer}vw)`;

  const isLeft = direction === 'left';
  const fadeAmount = isLeft
    ? Math.max(0, hoverRatio - 0.5)
    : Math.max(0, 0.5 - hoverRatio);

  // 0 = black, 1 = white
  const lerpedColor = Math.min(1, fadeAmount * 4); // stronger shift

  const textColor = `rgb(${lerpedColor * 255}, ${lerpedColor * 255}, ${lerpedColor * 255})`;

  const dynamicStyle = {
    opacity: 1 - fadeAmount * 1.2,
    filter: `grayscale(${fadeAmount * 2})`,
    color: textColor,
    transition: 'opacity 0.3s ease, filter 0.3s ease, color 0.3s ease',
  };

  useEffect(() => {
    async function animateSequence() {
      // Start foreground first
      fgControls.start({
        x: '0%',
        transition: { duration: 1.5, ease: 'easeInOut' },
      });

      // Then background follows slightly
      bgControls.start({
        x: '0%',
        transition: {
            type: 'spring',
            duration: 1.6,
            ease: 'easeOut',
            delay: 0.5,
        },
      });

      setShowText(true);
    }

    animateSequence();
  }, []);

  return (
    <div
        className="absolute inset-0 overflow-hidden"
        style={{
            zIndex:
            direction === 'left'
                ? hoverRatio < 0.5 ? 20 : 10
                : hoverRatio >= 0.5 ? 20 : 10,
        }}
    >
    {/* Foreground image */}
    <motion.img
      src={fgSrc}
      alt="fg"
      initial={{ x: direction === 'left' ? '-100%' : '100%' }}
      animate={fgControls}
      style={{ ...dynamicStyle, clipPath: clipValue }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className="absolute top-0 left-0 w-full h-full object-contain z-10 pointer-events-none"
    />


    {/* Background image */}
    <motion.img
      src={bgSrc}
      alt="bg"
      initial={{ x: direction === 'left' ? '-100%' : '100%' }}
      animate={bgControls}
      style={{ ...dynamicStyle, clipPath: clipValue }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className={`absolute top-0 left-0 w-full h-full object-contain z-0 pointer-events-none ${
        direction === 'right' ? 'clip-right' : 'clip-left'
      }`}
    />


    <a
      href={ linkTo }
      className="absolute inset-0 z-40"
      aria-label={direction === 'left' ? 'Go to About' : 'Go to Badminton'}
    >
      <span className="sr-only">
        {direction === 'left' ? 'Go to About' : 'Go to Badminton'}
      </span>
    </a>

    {/* Text */}
    {showText && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={dynamicStyle}
        className={`absolute top-1/4 -translate-y-1/2 ${
          direction === 'left' ? 'left-20 text-left' : 'right-20 text-right'
        } z-20`}
      >
        <h2 className="font-mono text-sm sm:text-xl md:text-2xl lg:text-5xl font-bold mb-2 break-words">{title}</h2>
        <p className="font-mono text-sm sm:text-base lg:text-lg break-words max-w-md w-full md:w-[16rem] lg:w-[28rem] hidden md:block">{subtitle}</p>
      </motion.div>
    )}
    </div>
  );
}