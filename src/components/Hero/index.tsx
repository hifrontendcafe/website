import { motion } from 'framer-motion';

interface HeroProps {
  title?: string;
}

const Hero: React.FC<HeroProps> = ({ title }) => {
  return (
    <div className="relative py-32 mx-auto bg-white bg-opacity-0">
      <div className="flex items-center justify-center h-full text-white bg-center bg-cover md:justify-around">
        <div className="z-10 w-auto text-center">
          <div className="text-4xl font-extrabold sm:text-5xl md:text-7xl">
            <div>
              <p>
                <motion.span
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    type: 'spring',
                    velocity: 2,
                  }}
                  className="inline-block text-indigo-500"
                >
                  {title}
                </motion.span>
              </p>
              <span
                style={{ width: 'min-content' }}
                className="px-2 -mt-2 text-4xl sm:text-5xl md:text-7xl"
              >
                en comunidad
              </span>
              <p className="mt-4 text-xl font-medium text-gray-300">
                El lugar de encuentro para potenciar tus ideas y conectar con
                otras personas.
              </p>
              <a
                target="_blank"
                href="https://discord.gg/frontendcafe"
                className="text-black bg-white btn"
                rel="noreferrer"
              >
                Unirme a Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
