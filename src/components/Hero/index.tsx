import {
  faChevronDown,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Hook that returns a counter that increments every `seconds` seconds,
 * and resets to 0 when it reaches `max`.
 */
function useCounter(initialValue: number, max: number, seconds: number) {
  const [counter, setCounter] = useState(initialValue);

  useEffect(() => {
    if (max === 0) {
      return;
    }

    const interval = setInterval(() => {
      setCounter((counter) => {
        const nextCounter = counter + 1;

        if (nextCounter === max) {
          return 0;
        }

        return nextCounter;
      });
    }, seconds * 1000);

    return () => clearInterval(interval);
  }, [max, seconds]);

  return counter;
}

interface HeroProps {
  heroWords: string[];
  subtitle: string;
  description?: string;
  discordButtonLabel: string;
  iniciativasButtonText: string;
  handleIniciativasClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({
  heroWords,
  subtitle,
  description,
  discordButtonLabel,
  iniciativasButtonText,
  handleIniciativasClick,
}) => {
  const counter = useCounter(0, heroWords.length, 3);
  const title = heroWords[counter];

  return (
    <div className="relative py-32 mx-auto bg-white/0">
      <div className="flex items-center justify-center h-full bg-center bg-cover text-primary md:justify-around">
        <div className="z-10 w-auto text-center">
          <div className="flex flex-col items-center">
            <div className="mb-16">
              <p className="text-5xl font-black md:font-extrabold sm:text-5xl md:text-7xl xl:text-8xl font-title">
                <motion.span
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    type: 'spring',
                    velocity: 2,
                  }}
                  className="inline-block text-greenFec"
                >
                  {title}
                </motion.span>
              </p>
              <span
                style={{ width: 'min-content' }}
                className="text-5xl font-black md:font-extrabold sm:text-5xl md:text-7xl xl:text-8xl font-title"
              >
                {subtitle}
              </span>
              <p className="max-w-xl mx-auto mt-4 text-xl font-medium text-tertiary md:text-2xl">
                {description}
              </p>
            </div>
            <a
              target="_blank"
              href="https://discord.gg/frontendcafe"
              rel="noreferrer"
            >
              <button className="flex items-center m-auto mb-20 text-md md:px-8 md:py-3 btn btn-primary">
                {discordButtonLabel}
                <FontAwesomeIcon
                  icon={faExternalLinkAlt}
                  width="16px"
                  className="ml-3"
                />
              </button>
            </a>
            <button
              onClick={handleIniciativasClick}
              className="flex items-center self-center justify-center font-semibold text-primary"
            >
              {iniciativasButtonText}
              <FontAwesomeIcon
                icon={faChevronDown}
                width="16px"
                className="ml-3 animate-bounce"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
