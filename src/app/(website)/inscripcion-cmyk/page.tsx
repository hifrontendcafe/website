import CMYKForm from '@/components/CMYKForm';
import SectionHero from '@/components/SectionHero';
import { getSettings } from '@/lib/sanity/getSettings';
import { getMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export const revalidate = 600;

export const generateMetadata = () => getMetadata({ title: 'CMYK' });

export default async function CMYKInscriptionPage() {
  const {
    cmykSettings: { cmykInscription, cmykInscriptionChix },
  } = await getSettings();

  return (
    <>
      <SectionHero
        title="CMYK 5"
        paragraph="Agosto 2022"
        cta="https://frontend.cafe/docs/guia-cmyk"
      />

      <section className="flex flex-col-reverse items-center md:flex-row">
        <div className="mt-8 space-y-4 text-center text-secondary md:mt-0 md:w-1/2 md:text-left">
          <p className="text-lg leading-relaxed">
            Desde <b>FrontendCafé </b> impulsamos el desarrollo de proyectos
            colaborativos realizados por miembros de la comunidad con el
            objetivo de ganar experiencia en un entorno profesional.
          </p>
          <p className="text-lg leading-relaxed">
            En CMYK 5 tendremos la colaboración de{' '}
            <Link
              href="https://servicedesignclub.com/"
              className="hover:text-[#FFEE94]"
            >
              <b>Service Design Club</b>
            </Link>
            , quienes llevarán a cabo toda la etapa de diseño, con esto
            llevaremos al siguiente nivel los proyectos.
          </p>
          <div className="flex flex-col flex-wrap gap-4 md:flex-row">
            <Link
              target="_blank"
              className="btn btn-primary"
              href="https://www.notion.so/hifrontendcafe/Cronograma-CMYK-5-a07d7a873d884b5daa0299f948612e1c?v=ce6031afdfbf475c90081d78b347d1f7"
            >
              Conocé el cronograma
            </Link>
            <Link
              className="btn btn-secondary"
              target="_blank"
              href="https://hifrontendcafe.notion.site/Proyectos-CMYK-5-de27daf7ea334cd4be4e564745c2e93c"
            >
              Conocé más los proyectos
            </Link>
            <Link
              className="btn btn-secondary"
              target="_blank"
              href="https://discord.com/channels/594363964499165194/769232248724652033"
            >
              Hace tu consulta aquí
            </Link>
          </div>
        </div>
        <div className="md:mb-0 md:w-1/2 md:max-w-lg md:pl-10 lg:w-full lg:max-w-xl">
          <Image
            className="rounded object-cover object-center"
            alt="hero"
            src="/img/cmyk-girl.min.svg"
            width={1026.96}
            height={909.48}
          />
        </div>
      </section>

      <Suspense>
        <CMYKForm
          cmykInscription={cmykInscription}
          cmykInscriptionChix={cmykInscriptionChix}
        />
      </Suspense>
    </>
  );
}
