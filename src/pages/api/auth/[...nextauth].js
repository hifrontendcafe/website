import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      scope: 'identify email guilds',
      authorizationUrl:
        'https://discord.com/api/oauth2/authorize?client_id=859532135367180288&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fdiscord&response_type=code&scope=identify%20email%20guilds',
      profile(profile) {
        if (profile.avatar === null) {
          const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
          profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = profile.avatar.startsWith('a_') ? 'gif' : 'png';
          profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
        }
        return {
          id: profile.id,
          name: `${profile.username}#${profile.discriminator}`,
          image: profile.image_url,
          email: profile.email,
        };
      },
    }),
  ],
  callbacks: {
    async signIn(_, account) {
      const data = await fetch('https://discord.com/api/users/@me/guilds', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${account.accessToken}`,
        },
      });
      const guilds = await data.json();
      const allGuildNames = guilds.map((guild) => guild.name);

      const isInFec = allGuildNames.includes('FrontendCafé');

      return isInFec ? true : '/unauthorized';
    },
  },
});
