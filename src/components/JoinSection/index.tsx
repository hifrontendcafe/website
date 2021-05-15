import useTranslation from 'next-translate/useTranslation';

const JoinSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="container flex flex-col items-center gap-5 mx-auto mb-24">
      <span className="relative inline-flex items-center gap-2 text-xl font-semibold md:text-3xl">
        {t('home:ready')}
        <img className="w-8 h-8" src="/icons/hearth.svg" />
      </span>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://discord.gg/frontendcafe"
        className="mt-1 btn btn-secondary"
      >
        {t('common:join')}
      </a>
    </section>
  );
};

export default JoinSection;
