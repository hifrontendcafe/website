import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SectionHeroProps {
  title: string;
  paragraph: string;
  cta?: string;
}

const SectionHero: React.FC<SectionHeroProps> = ({ title, paragraph, cta }) => {
  return (
    <section className="relative body-font">
      <div className="flex flex-col items-center justify-center pt-12 lg:pt-24 md:flex-row">
        <div className="max-w-3xl text-lg md:text-center">
          <h1 className="leading-snug tracking-tight text-gray-50 title">
            {title}
          </h1>
          <p className="max-w-3xl mt-4 mb-4 text-lg leading-relaxed text-gray-300">
            {paragraph}
          </p>
          <div className="flex justify-center">
            {cta && (
              <span className="flex mt-5 cursor-pointer text-primary">
                <a target="_blank" href={cta} rel="noreferrer">
                  Conoce más sobre la iniciativa&nbsp;
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
