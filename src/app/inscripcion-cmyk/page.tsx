import { use } from 'react';
import Link from 'next/link';
import CMYKForm from '@/components/CMYKForm';
import SectionHero from '@/components/SectionHero';
import { getSettings } from '@/lib/api.server';
import { getMetadata } from '@/lib/seo';

export const generateMetadata = () => getMetadata({ title: 'CMYK' });

export default function CMYKInscriptionPage() {
  const {
    cmykSettings: { cmykInscription, cmykInscriptionChix },
  } = use(getSettings());

  return (
    <>
      <SectionHero
        title="CMYK 5"
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
              <Link
                href={'https://servicedesignclub.com/'}
                className="hover:text-[#FFEE94]"
              >
                <b>Service Design Club</b>
              </Link>
              , quienes llevarán a cabo toda la etapa de diseño, con esto
              llevaremos al siguiente nivel los proyectos.
            </p>
            <div className="flex flex-col md:flex-row gap-4 flex-wrap">
              <Link
                target="_blank"
                className="inline-flex justify-center btn btn-primary"
                href="https://www.notion.so/hifrontendcafe/Cronograma-CMYK-5-a07d7a873d884b5daa0299f948612e1c?v=ce6031afdfbf475c90081d78b347d1f7"
              >
                Conocé el cronograma
              </Link>
              <Link
                className="inline-flex justify-center btn btn-secondary"
                target={'_blank'}
                href="https://hifrontendcafe.notion.site/Proyectos-CMYK-5-de27daf7ea334cd4be4e564745c2e93c"
              >
                Conocé más los proyectos
              </Link>
              <Link
                className="inline-flex justify-center btn btn-secondary"
                target={'_blank'}
                href="https://discord.com/channels/594363964499165194/769232248724652033"
              >
                Hace tu consulta aquí
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

      <CMYKForm
        cmykInscription={cmykInscription}
        cmykInscriptionChix={cmykInscriptionChix}
      />
    </>
  );
}
