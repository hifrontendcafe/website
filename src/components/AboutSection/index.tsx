import React from 'react';

const AboutSection: React.FC = () => (
  <section
    id="about"
    className="flex relative flex-wrap pb-5 w-full mx-0 px-0 items-center mt-24 mb-12"
    style={{ backgroundColor: '#F5F9FF' }}
  >
    <div
      className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
      style={{ height: '80px', transform: 'translateZ(0)' }}
    >
      <svg
        height="651"
        viewBox="0 0 1440 651"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M579.299 21.0202C255.41 -30.8367 54.146 25.3416 -6 59.9128V651H1447V59.9128C1376.02 46.9486 1204.28 21.0202 1085.12 21.0202C936.176 21.0202 984.159 85.8412 579.299 21.0202Z"
          fill="#F5F9FF"
        />
      </svg>
    </div>

    <div className="w-full md:w-6/12 px-4 mr-auto ml-auto mb-16">
      <h3 className="text-4xl text-center md:text-left md:text-4xl lg:text-5xl mb-2 leading-normal text-primary font-bold">
        ¿Quienes somos?
      </h3>
      <p className="text-lg text-center md:text-left leading-relaxed mt-4 mb-4 text-gray-700">
        Somos una comunidad de personas interesadas en tecnología y ciencias de
        informatica, lenguajes de programación, diseño web, infraestructura y
        muchas<span className="font-bold"> ganas de aprender entre todos</span>.
        <span className="block">
          Todo pasa adentro, en nuestro hermoso servidor de Discord.
        </span>
      </p>
    </div>

    <div className="w-3/4 md:w-4/12 px-4 mr-auto ml-auto">
      <iframe
        className="w-full shadow-lg md:max-w-sm lg:min-w-0 sm:min-w-full"
        src="https://discordapp.com/widget?id=594363964499165194&theme=dark"
        height="400"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      />
    </div>
  </section>
);

export default AboutSection;
