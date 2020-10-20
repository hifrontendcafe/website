import styles from './styles.module.css';

const Hero = () => (
  <div
    className="relative pt-16 pb-32 flex content-center items-center justify-center"
    style={{
      minHeight: '75vh',
    }}
  >
    <div
      className="absolute top-2 w-full h-full bg-center bg-cover"
      style={{
        backgroundImage: "url('/bg.svg')",
      }}
    >
      <span className="w-full h-full absolute opacity-50 bg-black"></span>
    </div>
    <div className="container relative mx-auto lg:px-64">
      <h1 className="text-highlighted font-extrabold text-white leading-7">
        Somos
      </h1>
      <h1
        className={`text-highlighted font-extrabold text-white ${styles.highlighted}`}
      >
        FrontEndCafé
      </h1>
      <p className="leading-3 text-gray-200 font-thin text-2xl">
        Podés aprender y podés enseñar ~
      </p>
    </div>
    <div
      className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
      style={{ height: '70px', transform: 'translateZ(0)' }}
    >
      <svg
        className="absolute bottom-0 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        version="1.1"
        viewBox="0 0 2560 100"
        x="0"
        y="0"
      >
        <polygon
          className="text-gray-300 fill-current"
          points="2560 0 2560 100 0 100"
        ></polygon>
      </svg>
    </div>
  </div>
);

export default Hero;
