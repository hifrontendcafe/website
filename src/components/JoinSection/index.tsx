import { FC } from 'react';

const JoinSection: FC = () => (
  <section className="text-center mb-24">
    <p className="font-semibold mb-2">
      <span className="relative text-lg">
        ¿Estás listo para unirte?
        <img
          className="inline w-8 h-8 absolute"
          src="/icons/hearth.svg"
          style={{ right: -40 }}
        />
      </span>
    </p>
    <a
      href="https://discord.gg/frontendcafe"
      className="btn mt-1 btn-secondary"
    >
      Sumate a Discord
    </a>
  </section>
);

export default JoinSection;
