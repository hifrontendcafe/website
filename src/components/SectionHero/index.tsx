import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SectionHeroProps {
  title: string;
  paragraph?: string;
  cta?: string;
}

const SectionHero: React.FC<SectionHeroProps> = ({ title, paragraph, cta }) => {
  return (
    <section className="relative body-font">
      <div className="flex flex-col py-12 md:items-center md:justify-center lg:pt-24 md:flex-row">
        <div className="text-lg md:text-center">
          <h1 className="title">{title}</h1>
          {paragraph && (
            <p className="max-w-4xl mx-auto my-4 paragraph">{paragraph}</p>
          )}
          <div className="flex md:justify-center">
            {cta && (
              <span className="flex cursor-pointer md:text-xl text-informational">
                <a target="_blank" href={cta} rel="noreferrer">
                  Conoce más sobre la iniciativa&nbsp;
                </a>
                <FontAwesomeIcon icon={faExternalLinkAlt} width="20px" />
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
