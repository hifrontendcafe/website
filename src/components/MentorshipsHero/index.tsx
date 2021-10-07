import Link from 'next/link';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MentorshipsHero: React.FC = () => {
  return (
    <section className="relative text-gray-100 body-font">
      <div className="container flex flex-col items-center py-32 mx-auto md:flex-row">
        <div className="max-w-3xl mt-4 text-lg text-gray-200">
          <h1 className="mt-2 leading-snug tracking-tight title">
            Programa de mentorías
          </h1>
          <p className="max-w-3xl mt-4 mb-4 text-lg leading-relaxed text-gray-200">
            Iniciarnos en el mundo de la tecnología puede resultar abrumador o
            verse como un desafío. Eso nos puede llevar a preguntarnos por dónde
            comenzar y qué elegir de todo lo que abarca el rubro de IT.
          </p>
          <p className="max-w-3xl mt-4 mb-8 text-lg leading-relaxed text-gray-200">
            El programa de mentorías de FrontendCafé busca servirte de guía en
            este camino, conectándote con profesionales y referentes capacitados
            en los múltiples y diversos temas que engloba el universo de las
            tecnologías de la información.
          </p>
          <div>
            <span className="flex mt-5 cursor-pointer text-primary">
              <a
                target="_blank"
                href="https://frontend.cafe/docs/guia-para-realizar-mentorias"
                rel="noreferrer"
              >
                Conocé más sobre la iniciativa&nbsp;
              </a>
              <FontAwesomeIcon icon={faExternalLinkAlt} width="16px" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorshipsHero;
