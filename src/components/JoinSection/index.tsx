const JoinSection: React.FC = () => (
  <section className="flex flex-col items-center justify-center gap-5 text-center my-24 md:my-32 container mx-auto">
    <span className="inline-flex gap-2 items-center relative text-2xl md:text-3xl font-semibold">
      ¿Estás listo para unirte?
      <img className="w-8 h-8" src="/icons/hearth.svg" />
    </span>
    <a
      target="_blank"
      href="https://discord.gg/frontendcafe"
      className="btn mt-1 btn-secondary"
    >
      Súmate a Discord
    </a>
  </section>
);

export default JoinSection;
