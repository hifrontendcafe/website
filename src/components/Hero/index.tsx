import { motion } from 'framer-motion';
import {
  faExternalLinkAlt,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface HeroProps {
  title?: string;
  handleIniciativasClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ title, handleIniciativasClick }) => {
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
                en comunidad
              </span>
              <p className="max-w-xl mx-auto mt-4 text-xl font-medium text-tertiary md:text-2xl">
                El lugar de encuentro para conectar con otras personas y
                potenciar tus ideas.
              </p>
            </div>
            <a
              target="_blank"
              href="https://discord.gg/frontendcafe"
              rel="noreferrer"
            >
              <button className="flex items-center m-auto mb-20 text-md md:px-8 md:py-3 btn btn-primary">
                Súmate a Discord
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
              Conoce las iniciativas
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
