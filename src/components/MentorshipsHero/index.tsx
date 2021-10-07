import Link from 'next/link';

const MentorshipsHero: React.FC = () => {
  return (
    <section className="relative text-gray-700 bg-white body-font">
      <div className="container flex flex-col items-center px-5 py-32 mx-auto md:flex-row">
        <div className="w-5/6 mb-10 lg:max-w-lg lg:w-full md:w-1/2 md:mb-0">
          <img
            className="object-cover object-center rounded shadow-sm"
            alt="hero"
            src="/img/mentorship.jpg"
          />
        </div>
        <div className="flex flex-col items-center lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 md:items-start md:text-left sm:text-center">
          <h1 className="mb-4 text-center title">Programa de mentorías</h1>
          <p className="mb-4 leading-relaxed">
            Iniciarnos en el mundo de la tecnología puede resultar abrumador o
            verse como un desafío. Eso nos puede llevar a preguntarnos por dónde
            comenzar y qué elegir de todo lo que abarca el rubro de IT.
          </p>
          <p className="mb-8 leading-relaxed">
            El programa de mentorías de FrontendCafé busca servirte de guía en
            este camino, conectándote con profesionales y referentes capacitados
            en los múltiples y diversos temas que engloba el universo de las
            tecnologías de la información.
          </p>
          <div className="flex justify-center">
            <Link href="/docs/guia-para-realizar-mentorias">
              <a
                target="_blank"
                className="inline-flex px-6 py-2 text-lg text-white border-0 rounded bg-primary focus:outline-none hover:bg-primarydark"
              >
                Reglas
              </a>
            </Link>
            <Link href="/docs/codigo-de-conducta">
              <a
                target="_blank"
                className="inline-flex px-6 py-2 ml-4 text-lg text-gray-700 bg-gray-200 border-0 rounded focus:outline-none hover:bg-gray-300"
              >
                Código de conducta
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 top-auto w-full overflow-hidden pointer-events-none"
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
            className="text-white fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </section>
  );
};

export default MentorshipsHero;
