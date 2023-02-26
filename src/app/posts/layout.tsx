import Hero from '@/components/Hero';
import { getSettings } from '@/lib/api.server';
import type { Layout } from '@/lib/types';

const PostsLayout: Layout = async ({ children }) => {
  const {
    heroSubtitle,
    heroDescription,
    discordButtonLabel,
    iniciativasButtonText,
  } = await getSettings();

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
