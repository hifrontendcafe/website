import styles from './styles.module.css';

const HomeHero: React.FC = () => {
  return (
    <>
      <section className={`bg-cover text-gray-700 body-font ${styles.main}`}>
        <div className="w-full bg-opacity-50 bg-gradient-to-t from-black">
          <div className="flex bg-cover py-12 items-center justify-between flex-wrap container mx-auto px-5 lg:px-0">
            <div className="max-w-xl lg:min-w-0 sm:min-w-full md:py-16 py-10 text-shadow">
              <img
                src="/fec-new.svg"
                className="pb-2 w-2/3 lg:w-10/12 mx-auto lg:mx-0"
                alt="FRONTENDCAFE"
              />
              <div className="lg:pl-12 text-md text-center lg:text-left">
                <p className="text-xl text-green-500 font-medium pb-2">
                  Podés aprender y podés enseñar ~
                </p>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Somos una comunidad de personas interesadas en tecnología y
                  ciencias informáticas en donde charlamos sobre lenguajes de
                  programación, diseño web, infraestructura, compartimos dudas,
                  preguntamos y respondemos.
                </p>
                <p className="text-gray-700 text-sm italic mt-2">
                  No nos olvidamos de divertirnos así que jugamos
                  <span className="text-pink-400"> Tetris </span>en los recreos.
                </p>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://discord.gg/3GC6TJd"
                >
                  <button className="bg-secondary hover:bg-secondarydark text-white font-medium py-2 px-4 rounded mt-5">
                    ¡Sumate a nuestro Discord!
                  </button>
                </a>
              </div>
            </div>
            <iframe
              className="w-full md:max-w-sm lg:min-w-0 sm:min-w-full"
              src="https://discordapp.com/widget?id=594363964499165194&theme=dark"
              height="450"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeHero;
