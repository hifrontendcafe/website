import Link from 'next/link';
import { motion } from 'framer-motion';
import { imageBuilder } from '../../lib/sanity';
import { useSettings } from '@/lib/settings';

interface HeroProps {
  title?: string;
}

const Hero: React.FC<HeroProps> = ({ title }) => {
  const { heroBackground } = useSettings();

  const bg = imageBuilder.image(heroBackground).width(1280).url();

  return (
    <div className="container relative px-8 py-32 mx-auto bg-white bg-opacity-0">
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

type CounterSquareProps = {
  big: string;
  text: string;
  color?: string;
  bgColor?: string;
};

const CounterSquare: React.FC<CounterSquareProps> = ({
  big = '10',
  text = 'Default',
  color = 'bg-green-400',
  bgColor = 'bg-green-500',
}) => {
  return (
    <div
      className={`flex justify-center items-center relative w-24 lg:w-32 h-20 lg:h-24 rounded-lg ${bgColor}`}
    >
      <div
        style={{ transform: 'rotate(-15deg)' }}
        className={`z-10 absolute top-0 left-0 w-24 lg:w-32 h-20 lg:h-24 rounded-lg ${color}`}
      ></div>
      <div className="z-20 font-bold text-center text-white lg:text-left">
        <p className="text-2xl lg:text-3xl">{big}</p>
        <p className="text-md">{text}</p>
      </div>
    </div>
  );
};

export default Hero;
