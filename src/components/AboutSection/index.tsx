import useTranslation from 'next-translate/useTranslation';

type AboutProps = {
  description?: string;
};

const AboutSection: React.FC<AboutProps> = ({ description }) => {
  const { t } = useTranslation('home');

  return (
    <section
      id="about"
      className="container relative flex flex-wrap items-center w-full px-5 pt-10 pb-5 mx-auto mt-12 mb-12 md:mt-24"
    >
      <div className="w-full px-4 mb-16 ml-auto mr-auto md:w-6/12 ">
        <h3 className="mb-2 text-center text-green-500 title md:text-left">
          {t('aboutUs')}
        </h3>
        <p className="mt-4 mb-4 text-lg leading-relaxed sm:text-center text-gray-700 md:text-left">
          {description}
        </p>
      </div>

      <div className="px-4 mx-auto md:w-4/12">
        <iframe
          className="w-full shadow-lg md:max-w-sm lg:min-w-0 sm:min-w-full"
          src="https://discordapp.com/widget?id=594363964499165194&theme=dark"
          height="400"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        />
      </div>
    </section>
  );
};

export default AboutSection;
