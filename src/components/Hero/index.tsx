import { motion } from 'framer-motion';
import styles from './styles.module.css';

interface HeroProps {
  title?: string;
}

const Hero: React.FC<HeroProps> = ({ title = 'Somos' }) => (
  <div
    className="relative flex content-center items-center justify-center"
    style={{
      minHeight: '70vh',
    }}
  >
    <div
      className="absolute w-full h-full bg-center bg-cover"
      style={{
        backgroundImage: "url('/bg.svg')",
      }}
    >
      <span className="w-full h-full absolute opacity-50 bg-black"></span>
    </div>
    <div className="container relative mx-auto grid place-items-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1 className="text-6xl md:text-highlighted font-extrabold text-white leading-7">
          {title}
        </h1>
        <h1
          className={`text-6xl md:text-highlighted font-extrabold text-white ${styles.highlighted}`}
        >
          FrontEndCafé
        </h1>
        <p className="leading-3 text-gray-200 font-thin text-2xl"></p>
      </motion.div>
    </div>
  </div>
);

export default Hero;
