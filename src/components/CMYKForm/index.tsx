'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn, useSession } from 'next-auth/react';
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

export const revalidate = 1;

export default function CMYKForm({
  cmykInscription,
  cmykInscriptionChix,
}: CMYKFormProps) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const searchParams = useSearchParams()!;

  const type = searchParams.get('type');

  const typeSelected = useMemo(() => {
    const lastType = formsTypes[0].type;

    if (!type) return lastType;

    const currentTypeSelected = formsTypes.find(
      (form) => form.type === (type as string),
    )?.type;

    return currentTypeSelected ?? lastType;
  }, [type]);

  const currentForm = formsTypes.find((form) => form.type === typeSelected);

  const tabStyle = `py-2 cursor-pointer text-tertiary w-1/3 flex justify-center border-b text-center`;
  const tabStyleActive = `py-2 font-semibold cursor-pointer text-zinc-100 w-1/3 flex justify-center border-b-4 border-zinc-100 text-center`;

  let shouldShowForm = cmykInscription;
  const isChix = !!session && session.user.roles.includes('Chix');

  if (cmykInscriptionChix) {
    shouldShowForm = isChix;
  }

  return (
    <div>
      {shouldShowForm ? (
        <div className="overflow-hidden  rounded-lg">
          <div className="pt-10 md:pt-15 lg:pt-20 md:py-5">
            {session && !loading ? (
              <>
                <div className="flex flex-col justify-center items-left">
                  <h2 className="text-2xl font-bold leading-7 text-secondary md:text-3xl lg:text-4xl sm:leading-9 sm:truncate">
                    ¡Es la hora, participá de los proyectos CMYK!
                    &#x1F396;&#xFE0F;
                  </h2>
                </div>
                <ul className="flex flex-row justify-center mt-6 mb-10 w-full">
                  {formsTypes.map((form, index) => (
                    <li
                      className={
                        form.type === typeSelected ? tabStyleActive : tabStyle
                      }
                      key={String(index)}
                    >
                      <Link
                        replace
                        shallow
                        scroll={false}
                        className="w-full h-full"
                        href={`/inscripcion-cmyk/?type=${form.type}`}
                      >
                        {form.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold leading-7 text-secondary md:text-3xl lg:text-4xl sm:leading-9 sm:truncate">
                  ¡Es la hora, inicia sesión para poder inscribirte!
                </h2>
                <button
                  className="flex self-center my-6 btn btn-secondary "
                  style={{ transition: 'all .15s ease' }}
                  onClick={() => signIn('discord')}
                >
                  Iniciar sesión
                  <FontAwesomeIcon
                    icon={faDiscord}
                    width="15px"
                    className="ml-2"
                  />
                </button>
              </div>
            )}
          </div>
          {session && !loading && currentForm && (
            <CMYKParticipantForm
              type={currentForm.type}
              title={currentForm.title}
              cmykInscription={cmykInscription}
              isChix={isChix}
              isDisabled={currentForm.isDisabled}
            />
          )}
        </div>
      ) : (
        <div
          className="rounded-lg overflow-hidden mx-auto inset-x-0 flex justify-center items-center
                   bg-blue-500 text-primary text-sm font-bold px-4 py-3 my-6"
        >
          <p className="mx-auto text-lg font-bold text-center text-secondary sm:leading-9 sm:truncate">
            Las inscripciones a CMYK 5 se encuentran cerradas
          </p>
        </div>
      )}
    </div>
  );
}
