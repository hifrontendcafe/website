import { motion } from 'framer-motion';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

interface HeroProps {
  title?: string;
}

const Hero: React.FC<HeroProps> = ({ title }) => {
  return (
    <div className="relative py-32 mx-auto bg-white bg-opacity-0">
      <div className="flex items-center justify-center h-full bg-center bg-cover text-coolGray-50 md:justify-around">
        <div className="z-10 w-auto text-center">
          <div>
            <div className="mb-16">
              <p className="text-5xl font-black md:font-extrabold sm:text-5xl md:text-7xl xl:text-8xl">
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
                className="text-5xl font-black md:font-extrabold sm:text-5xl md:text-7xl xl:text-8xl"
              >
                en comunidad
              </span>
              <p className="mt-4 text-xl font-medium text-coolGray-300 md:text-lg">
                El lugar de encuentro para conectar con otras personas y
                potenciar tus ideas.
              </p>
            </div>
            <a
              target="_blank"
              href="https://discord.gg/frontendcafe"
              rel="noreferrer"
            >
              <button className="flex m-auto text-lg md:px-7 md:py-3 btn btn-primary">
                Súmate a Discord
                <FontAwesomeIcon
                  icon={faExternalLinkAlt}
                  width="20px"
                  className="ml-2"
                />
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
