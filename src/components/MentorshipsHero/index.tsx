import Link from 'next/link';

const MentorshipsHero: React.FC = () => {
  return (
    <section className="relative text-gray-700 body-font bg-white">
      <div
        className="container mx-auto flex px-5 py-32 lg:flex-row flex-col
        items-center"
      >
        <div className="lg:max-w-lg lg:w-full md:w-3/5 w-5/6 mb-10 md:mb-10 lg:order-last">
          <img
            className="object-cover object-center rounded shadow-sm"
            alt="hero"
            src="/img/mentorship.jpg"
          />
        </div>
        <div
          className="lg:flex-grow md:w-full lg:pr-40 md:pr-16 flex flex-col
          md:items-start md:text-left items-center"
        >
          <h1 className="title mb-4">Programa de mentorías</h1>
          <p className="mb-4 leading-relaxed">
            El programa de mentorías de FrontendCafé busca servirte de guía en tu
            camino IT, conectándote con profesionales y referentes capacitados en
            los múltiples y diversos temas que este mundo engloba.
          </p>
          <p className="mb-8 leading-relaxed font-sans">
            Por favor, antes de reservar una mentoría asegúrate de haber leído las&nbsp;
            <Link href="/docs/guia-para-realizar-mentorias">
              <a className="font-bold text-primary">reglas</a>
            </Link> y nuestro&nbsp;
            <Link href="/docs/codigo-de-conducta">
              <a className="font-bold text-primary">código de conducta</a>
            </Link>.
          </p>
          <div className="flex justify-center font-sans">
            <Link href="/docs/guia-para-realizar-mentorias">
              <a
                className="flex justify-center items-center text-white bg-primary 
                  border-0 py-2 px-7 focus:outline-none hover:bg-primarydark rounded 
                  text-lg font-bold w-72 h-14"
              >
                Encuentra a tu mentor
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
