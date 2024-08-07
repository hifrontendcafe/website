'use client';

import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import CMYKParticipantForm from '../CMYKParticipantForm';

export type FormsCMYK = {
  type: 'lider' | 'participant';
  title: string;
  isDisabled: boolean;
};

const formsTypes: FormsCMYK[] = [
  {
    type: 'participant',
    title: 'Participantes',
    isDisabled: true,
  },
  {
    type: 'lider',
    title: 'Líderes',
    isDisabled: false,
  },
];

type CMYKFormProps = {
  cmykInscription: boolean;
  cmykInscriptionChix: boolean;
};

export default function CMYKForm({
  cmykInscription,
  cmykInscriptionChix,
}: CMYKFormProps) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const searchParams = useSearchParams();

  const type = searchParams?.get('type');

  const typeSelected = useMemo(() => {
    const lastType = formsTypes[0].type;

    if (!type) return lastType;

    const currentTypeSelected = formsTypes.find(
      (form) => form.type === (type as string),
    )?.type;

    return currentTypeSelected ?? lastType;
  }, [type]);

  const currentForm = formsTypes.find((form) => form.type === typeSelected)!;

  const tabStyle = `py-2 cursor-pointer text-tertiary w-1/3 flex justify-center border-b text-center`;
  const tabStyleActive = `py-2 font-semibold cursor-pointer text-zinc-100 w-1/3 flex justify-center border-b-4 border-zinc-100 text-center`;

  let shouldShowForm = cmykInscription;
  const isChix = !!session && session.user.roles.includes('Chix');

  if (cmykInscriptionChix) {
    shouldShowForm = isChix;
  }

  if (!shouldShowForm) {
    return (
      <p className="mt-6 rounded-lg bg-blue-500 p-3 text-center text-lg font-bold text-secondary sm:leading-9">
        Las inscripciones a CMYK 5 se encuentran cerradas
      </p>
    );
  }

  if (session && !loading) {
    return (
      <section className="mt-24 space-y-6">
        <h2 className="text-center text-2xl font-bold leading-7 text-secondary md:text-3xl lg:text-4xl">
          ¡Es la hora, participá de los proyectos CMYK! &#x1F396;&#xFE0F;
        </h2>
        <ul className="mb-10 flex justify-center">
          {formsTypes.map((form, index) => (
            <li
              className={form.type === typeSelected ? tabStyleActive : tabStyle}
              key={String(index)}
            >
              <Link
                replace
                shallow
                scroll={false}
                href={`/inscripcion-cmyk/?type=${form.type}`}
              >
                {form.title}
              </Link>
            </li>
          ))}
        </ul>
        <CMYKParticipantForm
          type={currentForm.type}
          title={currentForm.title}
          cmykInscription={cmykInscription}
          isChix={isChix}
          isDisabled={currentForm.isDisabled}
        />
      </section>
    );
  }

  return (
    <section className="mt-24 space-y-6">
      <h2 className="text-center text-2xl font-bold leading-7 text-secondary md:text-3xl lg:text-4xl">
        ¡Es la hora, inicia sesión para poder inscribirte!
      </h2>
      <button
        className="btn btn-secondary mx-auto"
        onClick={() => signIn('discord')}
      >
        Iniciar sesión
        <FontAwesomeIcon icon={faDiscord} />
      </button>
    </section>
  );
}
