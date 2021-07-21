import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      scope: 'identify email guilds',
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
    async signIn(user, account, profile) {
      const guildResp = await fetch(
        'https://discord.com/api/users/@me/guilds',
        {
          headers: {
            Authorization: `Bearer ${account.accessToken}`,
          },
        },
      );
      const guilds = await guildResp.json();
      if (guilds.find((guild) => guild.id === '594363964499165194')) {
        return true;
      } else {
        return '/mentorias?login=denied';
      }
    },
    session: async (session, user) => {
      session.user.id = user.sub;
      return Promise.resolve(session);
    },
  },
});
