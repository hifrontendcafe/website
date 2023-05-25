import { FrontendCafeId } from '@/lib/constants';
import type { AuthOptions, Profile } from 'next-auth';
import Discord from 'next-auth/providers/discord';

export const authOptions: AuthOptions = {
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization:
        'https://discord.com/api/oauth2/authorize?scope=identify+email+guilds',
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
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ account }) {
      const guildResp = await fetch(
        'https://discord.com/api/users/@me/guilds',
        {
          headers: {
            Authorization: `Bearer ${account?.access_token}`,
          },
        },
      );
      // TODO: Catch possible errors, this can be an array or an error object.
      const guilds = await guildResp.json();
      const isFecMember = guilds.find((guild) => guild.id === FrontendCafeId);
      if (isFecMember) {
        return true;
      } else {
        return '/unauthorized';
      }
    },
    session: async ({ session, token }) => {
      session.user.id = token.sub as string;
      const response = await fetch(
        `https://discord.com/api/guilds/${FrontendCafeId}/members/${session.user.id}`,
        {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
          },
        },
      );
      const fecMember = await response.json();
      session.user.roles = fecMember.roles;
      return session;
    },
  },
};
