import { FrontendCafeId, roles } from '@/lib/constants';
import type { DiscordFECMember, DiscordGuild } from '@/lib/types';
import type { AuthOptions } from 'next-auth';
import Discord, { type DiscordProfile } from 'next-auth/providers/discord';

export const authOptions: AuthOptions = {
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization:
        'https://discord.com/api/oauth2/authorize?scope=identify+email+guilds',
      profile: (profile: DiscordProfile) => {
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
      const response = await fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
          Authorization: `Bearer ${account?.access_token}`,
        },
      });
      interface FetchError {
        message: string;
        code: number;
      }
      const guilds: DiscordGuild[] | FetchError = await response.json();
      if (!(guilds instanceof Array)) {
        return false;
      }

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
      const fecMember: DiscordFECMember = await response.json();
      return {
        ...session,
        user: {
          ...session.user,
          roles: fecMember.roles.map((role) => roles.get(role as any)),
        },
      };
    },
  },
};
