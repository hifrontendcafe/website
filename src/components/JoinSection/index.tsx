const JoinSection: React.FC = () => (
  <section className="flex flex-col items-center gap-5 mt-12 mb-24">
    <span className="relative inline-flex items-center gap-2 subtitle">
      ¿Estás listo para unirte?
      <img className="w-8 h-8" src="/icons/hearth.svg" />
    </span>
    <a
      target="_blank"
      href="https://discord.gg/frontendcafe"
      className="mt-1 btn btn-secondary"
      rel="noreferrer"
    >
      Súmate a Discord
    </a>
  </section>
);

export default JoinSection;
