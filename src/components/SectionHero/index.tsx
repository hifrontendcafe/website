import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SectionHeroProps {
  title: string;
  paragraph?: string;
  cta?: string;
  children?: React.ReactNode;
}

const SectionHero: React.FC<SectionHeroProps> = ({
  title,
  paragraph,
  cta,
  children,
}) => {
  return (
    <section className="py-12 lg:pt-24">
      <header className="text-lg font-medium md:text-center md:text-2xl">
        <h1 className="title">{title}</h1>
        {paragraph && (
          <p className="paragraph mx-auto my-4 max-w-4xl leading-normal text-secondary">
            {paragraph}
          </p>
        )}
        {cta && (
          <a
            target="_blank"
            href={cta}
            rel="noreferrer"
            className="inline-flex items-center gap-3 text-informational"
          >
            Conoce más sobre la iniciativa
            <FontAwesomeIcon icon={faExternalLinkAlt} width="16px" />
          </a>
        )}
      </header>

      {children && <div className="mt-20">{children}</div>}
    </section>
  );
};

export default SectionHero;
