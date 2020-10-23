import { motion } from 'framer-motion';
import styles from './styles.module.css';

interface HeroProps {
  title?: string;
  subtitle?: string;
  small?: boolean;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, small = false }) => {
  return (
    <div className={`relative ${small ? 'pt-16 md:pt-0' : 'pt-0'}`}>
      <div
        className="absolute w-full h-full bg-center bg-cover"
        style={{
          backgroundImage: "url('/bg.svg')",
        }}
      >
        <span className="w-full h-full absolute opacity-50 bg-black"></span>
      </div>
      <div
        className="container relative mx-auto grid place-items-center px-10"
        style={small ? { minHeight: '25vh' } : { minHeight: '60vh' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            key={title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className={` font-bold text-white leading-5 ${
              small
                ? 'text-2xl md:text-3xl lg:text-4xl'
                : 'text-3xl md:text-5xl lg:text-6xl'
            }
            }`}
          >
            {title}
          </motion.h1>
          <h1
            className={`font-extrabold text-white ${styles.highlighted} ${
              small
                ? 'text-2xl md:text-4xl lg:text-5xl'
                : 'text-4xl md:text-6xl lg:text-7xl'
            }`}
          >
            FrontEndCafé
          </h1>
          {subtitle && (
            <p
              className={`leading-6 text-gray-200 font-light
            ${small ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'}`}
            >
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
