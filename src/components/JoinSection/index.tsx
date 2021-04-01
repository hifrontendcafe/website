import React from 'react';

const JoinSection: React.FC = () => (
  <section className="flex flex-col items-center justify-center gap-5 text-center my-32">
    <p className="font-semibold">
      <span className="relative text-3xl">
        ¿Estás listo para unirte?
        <img
          className="inline w-8 h-8 absolute"
          src="/icons/hearth.svg"
          style={{ right: -40 }}
        />
      </span>
    </p>
    <a
      target="_blank"
      href="https://discord.gg/frontendcafe"
      className="btn mt-1 btn-secondary"
    >
      Sumate a Discord
    </a>
  </section>
);

export default JoinSection;
