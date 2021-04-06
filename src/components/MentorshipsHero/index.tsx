import Link from 'next/link';

const MentorshipsHero: React.FC = () => {
  return (
    <section className="relative text-gray-700 body-font bg-white">
      <div
        className="container mx-auto flex px-5 py-32 md:flex-row flex-col
        items-center"
      >
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded shadow-sm"
            alt="hero"
            src="/img/mentorship.jpg"
          />
        </div>
        <div
          className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col
          md:items-start md:text-left items-center text-center"
        >
          <h1
            className="title-font sm:text-4xl text-3xl mb-4 font-extrabold
            text-gray-900"
          >
            Programa de mentorías
          </h1>
          <p className="mb-4 leading-relaxed">
            Iniciarnos en el mundo de la tecnología puede resultar abrumador o
            verse como un desafío. Eso nos puede llevar a preguntarnos por dónde
            comenzar y qué elegir de todo lo que abarca el rubro de IT.
          </p>
          <p className="mb-8 leading-relaxed">
            El programa de mentorías de FrontEndCafé busca servirte de guía en
            este camino, conectándote con profesionales y referentes capacitados
            en los múltiples y diversos temas que engloba el universo de las
            tecnologías de la información.
          </p>
          <div className="flex justify-center">
            <Link href="/docs/guia-para-realizar-mentorias">
              <a
                className="inline-flex text-white bg-primary border-0 py-2 px-6
              focus:outline-none hover:bg-primarydark rounded text-lg"
              >
                Reglas
              </a>
            </Link>
            <Link href="/docs/codigo-de-conducta">
              <a
                className="ml-4 inline-flex text-gray-700 bg-gray-200 border-0
              py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg"
              >
                Código de conducta
              </a>
            </Link>
          </div>
        </div>
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
            className="text-white fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </section>
  );
};

export default MentorshipsHero;
