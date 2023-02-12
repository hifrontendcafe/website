import { use } from 'react';
import Hero from '@/components/Hero';
import { getSettings } from '@/lib/api.server';
import type { Layout } from '@/lib/types';

export const revalidate = 10;

const PostsLayout: Layout = ({ children }) => {
  const {
    heroSubtitle,
    heroDescription,
    discordButtonLabel,
    iniciativasButtonText,
  } = use(getSettings());

  return (
    <div>
      <Hero
        heroWords="Posts"
        subtitle={heroSubtitle}
        description={heroDescription}
        discordButtonLabel={discordButtonLabel}
        iniciativasButtonText={iniciativasButtonText}
      />

      {children}
    </div>
  );
};

export default PostsLayout;
