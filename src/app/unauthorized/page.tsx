import { getMetadata } from '@/lib/seo';
import Link from 'next/link';

export const generateMetadata = () =>
  getMetadata({
    title: 'No autorizado',
  });

export default function UnauthorizedPage() {
  return (
    <div className="mx-auto mt-20 max-w-lg rounded-lg border border-zinc-500 bg-zinc-800 px-6 py-6  shadow-xl">
      <h1 className="text-2xl font-semibold md:text-3xl">
        <span className="text-red-400">¡Oh no!</span> Todavía no formas parte de
        nuestra comunidad.
      </h1>
      <p className="my-6">
        Es necesario que te unas a nuestro servidor de Discord para poder
        acceder a esta sección.
      </p>
      <div className="mt-10 flex justify-end gap-3">
        <Link href="/" className="btn btn-primary">
          Volver al inicio
        </Link>
        <a
          target="_blank"
          className="btn btn-secondary"
          href="https://discord.gg/frontendcafe"
          rel="noreferrer"
        >
          Sumate a Discord
        </a>
      </div>
    </div>
  );
}
