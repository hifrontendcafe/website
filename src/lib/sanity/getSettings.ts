import client from '.';
import { settingsQuery } from '../queries';
import { Image } from '../types';

export interface SocialNetworks {
  github: string;
  linkedin: string;
  twitch: string;
  twitter: string;
  youtube: string;
  instagram: string;
}

export interface Settings {
  description: string;
  heroBackground: Image;
  heroWords: string[];
  heroSubtitle: string;
  heroDescription?: string;
  discordButtonLabel: string;
  iniciativasButtonText: string;
  logo: Image;
  navItems: {
    title: string;
    link: string;
  }[];
  socialnetworks: SocialNetworks;
  title: string;
  cmykSettings: {
    cmykInscription: boolean;
    cmykInscriptionChix: boolean;
  };
  footerNavItems: {
    title: string;
    link: {
      value: string;
    };
  }[];
}

export async function getSettings(next?: RequestInit['next']) {
  return client.fetch<Settings>(settingsQuery, {}, { next });
}
