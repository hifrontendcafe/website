import Hero from '@/components/Hero';
import { getSettings } from '@/lib/api.server';
import { use } from 'react';

export const revalidate = 10;

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    heroSubtitle,
    heroDescription,
    discordButtonLabel,
    iniciativasButtonText,
  } = use(getSettings());

  return (
    <div>
      <Hero
        heroWords="Entradas"
        subtitle={heroSubtitle}
        description={heroDescription}
        discordButtonLabel={discordButtonLabel}
        iniciativasButtonText={iniciativasButtonText}
      />

      {children}
    </div>
  );
}
