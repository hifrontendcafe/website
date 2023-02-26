import FeaturedCardList from '@/components/FeaturedCardList';
import Hero from '@/components/Hero';
import { getSettings, getAllFeaturedCards } from '@/lib/api.server';
import { getMetadata } from '@/lib/seo';

export const generateMetadata = () => getMetadata({ title: 'Home' });

export default async function HomePage() {
  const [settings, cards] = await Promise.all([
    getSettings({ next: { revalidate: 120 } }),
    getAllFeaturedCards({ next: { revalidate: 360 } }),
  ]);

  const {
    heroWords = ['Creamos'],
    heroSubtitle,
    heroDescription,
    discordButtonLabel,
    iniciativasButtonText,
  } = settings;

  return (
    <>
      <Hero
        heroWords={heroWords}
        subtitle={heroSubtitle}
        description={heroDescription}
        discordButtonLabel={discordButtonLabel}
        iniciativasButtonText={iniciativasButtonText}
      />

      <div id="iniciativas" className="flex flex-col mb-12 md:mb-24">
        <div className="flex flex-col items-center justify-center m-auto text-center my-28">
          <h1 className="mb-5 subtitle">¡Descubre nuestra comunidad!</h1>
          <p className="text-tertiary lg:text-xl text-md lg:w-2/3">
            Somos una comunidad de personas apasionadas por la tecnología en
            busca de facilitar la inserción laboral y el crecimiento personal a
            través de diferentes iniciativas que promueven la colaboración y el
            intercambio de conocimiento.
          </p>
        </div>
        <FeaturedCardList featuredCards={cards} />
      </div>
    </>
  );
}
