import FeaturedCardList from '@/components/FeaturedCardList';
import Hero from '@/components/Hero';
import { getAllFeaturedCards } from '@/lib/api.server';
import { getSettings } from '@/lib/sanity/getSettings';
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
      <section>
        <Hero
          heroWords={heroWords}
          subtitle={heroSubtitle}
          description={heroDescription}
          discordButtonLabel={discordButtonLabel}
          iniciativasButtonText={iniciativasButtonText}
        />
      </section>

      <section id="iniciativas">
        <div className="py-28 text-center">
          <h2 className="subtitle mb-5">¡Descubre nuestra comunidad!</h2>
          <p className="text-md mx-auto  text-tertiary lg:w-2/3 lg:text-xl">
            Somos una comunidad de personas apasionadas por la tecnología en
            busca de facilitar la inserción laboral y el crecimiento personal a
            través de diferentes iniciativas que promueven la colaboración y el
            intercambio de conocimiento.
          </p>
        </div>
        <FeaturedCardList featuredCards={cards} />
      </section>
    </>
  );
}
