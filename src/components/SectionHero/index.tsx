import Link from 'next/link';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SectionHeroProps {
  title: string;
  paragraph: string;
  cta?: string;
}

const SectionHero: React.FC<SectionHeroProps> = ({ title, paragraph, cta }) => {
  return (
    <section className="relative text-gray-100 body-font">
      <div className="container flex flex-col items-center justify-center pt-32 mx-auto md:flex-row">
        <div className="max-w-3xl mt-4 text-lg text-center text-gray-200">
          <h1 className="mt-2 leading-snug tracking-tight title">{title}</h1>
          <p className="max-w-3xl mt-4 mb-4 text-lg leading-relaxed text-gray-200">
            {paragraph}
          </p>
          <div className="flex justify-center">
            {cta && (
              <span className="flex mt-5 cursor-pointer text-primary">
                <a target="_blank" href={cta} rel="noreferrer">
                  Conocé más sobre la iniciativa&nbsp;
                </a>
                <FontAwesomeIcon icon={faExternalLinkAlt} width="16px" />
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
