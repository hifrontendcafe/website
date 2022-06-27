import Layout from '../../components/Layout';
import { useMemo } from 'react';
import { GetStaticProps } from 'next';
import { getSettings } from '@/lib/api';

import CMYKParticipantForm from '../../components/CMYKParticipantForm';
import { useSettings } from '@/lib/settings';
import { isChix } from '@/lib/haveRole';
import { signIn, useSession } from 'next-auth/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import SectionHero from '@/components/SectionHero';
import { useRouter } from 'next/router';
import Link from 'next/link';

type CMYKRegisterPageProps = {
  preview?: boolean;
};

export type FormsCMYK = {
  type: 'lider' | 'participant';
  title: string;
};

const formsTypes: FormsCMYK[] = [
  {
    type: 'participant',
    title: 'Participantes',
  },
  {
    type: 'lider',
    title: 'Líderes',
  },
];

const CMYKRegisterPage: React.FC<CMYKRegisterPageProps> = ({
  preview = false,
}) => {
  const {
    cmykSettings: { cmykInscription, cmykInscriptionChix },
  } = useSettings();
  const [session, loading] = useSession();

  const router = useRouter();

  const typeSelected = useMemo(() => {
    const lastType = formsTypes[0].type;

    if (!router.query.type) return lastType;

    const currentTypeSelected = formsTypes.find(
      (form) => form.type === (router.query.type as string),
    )?.type;

    return currentTypeSelected ?? lastType;
  }, [router.query.type]);

  const currentForm = formsTypes.find((form) => form.type === typeSelected);

  const tabStyle = `py-2 cursor-pointer text-tertiary w-1/3 flex justify-center border-b text-center`;
  const tabStyleActive = `py-2 font-semibold cursor-pointer text-zinc-100 w-1/3 flex justify-center border-b-4 border-zinc-100 text-center`;

  let shouldShowForm = cmykInscription;

  if (cmykInscriptionChix) {
    shouldShowForm = isChix(session?.user?.roles);
  }

  return (
    <Layout title="CMYK" preview={preview}>
      <SectionHero
        title="CMYK 5.0"
        paragraph="Agosto 2022"
        cta="https://frontend.cafe/docs/guia-cmyk"
      />
      <div className="flex flex-col-reverse items-center md:flex-row">
        <div className="flex text-center lg:grow md:w-1/2  md:text-left">
          <div className="mt-8 text-secondary">
            <p className="mb-4 text-lg leading-relaxed">
              Desde <b>FrontendCafé </b> impulsamos el desarrollo de proyectos
              colaborativos realizados por miembros de la comunidad con el
              objetivo de ganar experiencia en un entorno profesional.
            </p>
            <p className="mb-4 text-lg leading-relaxed">
              En CMYK 5 tendremos la colaboración de{' '}
              <Link href={'https://servicedesignclub.com/'}>
                <a className="hover:text-[#FFEE94]">
                  <b>Service Design Club</b>
                </a>
              </Link>
              , quienes llevarán a cabo toda la etapa de diseño, con esto
              llevaremos al siguiente nivel los proyectos.
            </p>
            <div className="flex flex-col md:flex-row gap-4 flex-wrap">
              <Link href="https://www.notion.so/hifrontendcafe/Cronograma-CMYK-5-a07d7a873d884b5daa0299f948612e1c?v=ce6031afdfbf475c90081d78b347d1f7">
                <a
                  className="inline-flex justify-center btn btn-primary"
                  target={'_blank'}
                >
                  Conocé el cronograma
                </a>
              </Link>
              <Link href="https://hifrontendcafe.notion.site/Proyectos-CMYK-5-de27daf7ea334cd4be4e564745c2e93c">
                <a
                  className="inline-flex justify-center btn btn-secondary"
                  target={'_blank'}
                >
                  Conocé más los proyectos
                </a>
              </Link>
              <Link href="https://discord.com/channels/594363964499165194/769232248724652033">
                <a
                  className="inline-flex justify-center btn btn-secondary"
                  target={'_blank'}
                >
                  Hace tu consulta aquí
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 lg:w-full md:max-w-lg lg:max-w-xl md:mb-0 md:pl-10">
          <img
            className={`object-cover object-center rounded `}
            alt="hero"
            src="/img/cmyk-girl.min.svg"
          />
        </div>
      </div>
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
                        href={`/inscripcion-cmyk/?type=${form.type}`}
                      >
                        <a className="w-full h-full">{form.title}</a>
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
          {session && !loading && (
            <CMYKParticipantForm
              type={currentForm.type}
              title={currentForm.title}
              isChix={isChix(session?.user?.roles)}
            />
          )}
        </div>
      ) : (
        <div
          className="rounded-lg overflow-hidden mx-auto inset-x-0 flex justify-center items-center 
                   bg-blue-500 text-primary text-sm font-bold px-4 py-3 my-6"
        >
          <p className="mx-auto text-lg font-bold text-center text-secondary sm:leading-9 sm:truncate">
            Las inscripciones a CMYK 5.0 se encuentran cerradas
          </p>
        </div>
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const settings = await getSettings(preview);
  return { props: { preview, settings }, revalidate: 1 };
};

export default CMYKRegisterPage;
