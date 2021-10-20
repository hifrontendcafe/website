import { motion } from 'framer-motion';

interface HeroProps {
  title?: string;
}

const Hero: React.FC<HeroProps> = ({ title }) => {
  return (
    <div className="relative py-32 mx-auto bg-white bg-opacity-0">
      <div className="flex items-center justify-center h-full bg-center bg-cover text-gray-50 md:justify-around">
        <div className="z-10 w-auto text-center">
          <div>
            <div className="mb-16">
              <p className="text-4xl font-black md:font-extrabold sm:text-5xl md:text-7xl xl:text-8xl">
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
                className="px-2 -mt-2 text-4xl sm:text-5xl md:text-7xl xl:text-8xl md:font-extrabold"
              >
                en comunidad
              </span>
              <p className="mt-4 text-base font-medium text-gray-300 md:text-lg">
                El lugar de encuentro para conectar con otras personas y
                potenciar tus ideas.
              </p>
            </div>
            <a
              target="_blank"
              href="https://discord.gg/frontendcafe"
              className="px-8 py-4 btn btn-primary"
              rel="noreferrer"
            >
              Unirme a Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
