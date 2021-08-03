import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      scope: 'identify email',
      profile(profile) {
        return {
          id: profile.id,
          name: `${profile.username}#${profile.discriminator}`,
          email: profile.email,
        };
      },
    }),
  ],
  callbacks: {
    session: async (session, user) => {
      session.user.id = user.sub;
      return Promise.resolve(session);
    },
  },
});
