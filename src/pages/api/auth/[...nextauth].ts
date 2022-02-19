import NextAuth, { Profile } from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      scope: 'identify email guilds',
      profile: (profile: Profile) => {
        if (profile.avatar === null) {
          const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
          profile.image = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          profile.image = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.webp`;
        }
        return {
          id: profile.id,
          name: `${profile.username}#${profile.discriminator}`,
          email: profile.email,
          image: profile.image,
        };
      },
    }),
  ],
  secret: process.env.SECRET,
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async signIn(user, account) {
      const guildResp = await fetch(
        'https://discord.com/api/users/@me/guilds',
        {
          headers: {
            Authorization: `Bearer ${account.accessToken}`,
          },
        },
      );
      const guilds = await guildResp.json();
      const isFecMember = guilds.find(
        (guild) => guild.id === '594363964499165194',
      );
      if (isFecMember) {
        return true;
      } else {
        return '/unauthorized';
      }
    },
    session: async (session, user) => {
      session.user.id = user.sub as string;
      return session;
    },
  },
});
