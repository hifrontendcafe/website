import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface Settings {
  description: string;
  heroBackground: Image;
  heroWords: string[];
  heroSubtitle: string;
  heroDescription?: string;
  discordButtonLabel: string;
  iniciativasButtonText: string;
  logo: Image;
  navItems: NavItemData[];
  socialnetworks: SocialNetworks;
  title: string;
  cmykSettings: CMYKSettings;
  footerNavItems: LinkItemData[];
}

export interface NavItemData {
  title: string;
  link: string;
}

interface LinkData {
  value: string;
}

export interface LinkItemData {
  title: string;
  link: LinkData;
}

export interface SocialNetworks {
  github: string;
  linkedin: string;
  twitch: string;
  twitter: string;
  youtube: string;
  instagram: string;
}

export interface CMYKSettings {
  cmykInscription: boolean;
  cmykInscriptionChix: boolean;
}

export interface Image {
  _type: string;
  asset: Asset;
}

export interface Asset {
  _ref: string;
  _type: string;
}

export interface Event {
  title: string;
  slug: string;
  category: {
    name: string;
  };
  cover: {
    src: string;
    alt?: string;
  };
  date: string;
  endDate?: string;
  description: string;
  recording?: string;
  discordId?: string;
}

export interface SanityEvent {
  _id?: string;
  discordId: string;
  title: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  category: { _ref: string; _type: 'reference' };
  cover: {
    _type: 'image';
    alt: string;
    asset: {
      _type: 'reference';
      _ref: string;
    };
  };
  date: string;
  description: [];
  tags: [];
}

export interface EventsSettings {
  automaticaticMigrationEnabled: boolean;
  sendEmailsOnMigration: boolean;
}

export interface Mentor {
  name: string;
  description: string;
  photo: {
    src: string;
    alt?: string;
  };
  status: 'ACTIVE' | 'NOT_AVAILABLE' | 'INACTIVE' | 'OUT';
  web: string;
  calendly: string;
  linkedin: string;
  github: string;
  twitter?: string;
  topics: [
    {
      _key: string;
      _ref: string;
    },
  ];
}

export interface CMYK {
  _id: string;
  name: string;
  description: string;
  color: string;
  image: {
    src: string;
  };
  github: string;
  demo: string;
  cmykVersion: string;
}

export interface CMYKParticipant {
  _id?: string;
  discordUser: {
    _type: string;
    _ref: string;
  };
  participationLevel?: string;
  participationType?: string;
  aboutParticipant: string;
  previousKnowledge: string;
  isChix: boolean;
  workExperience: string;
  stackWanted: string;
  timeAvailability: string;
  projects: string;
  experience: string;
  otherQuestions: string;
  cmykVersion: string;
  status: string;
}

export interface Topic {
  _id: string;
  title: string;
  description?: string;
}

export interface Author {
  name: string;
  picture: string;
}

export interface PageProfile {
  preview?: boolean;
  profile: Profile;
}

export type ExtendedProfile = Profile & {
  seniority: {
    id: string;
    name: string;
  };
  role: {
    id: string;
    name: string;
  };
  technologies: { name: string }[];
};

export interface Doc {
  title: string;
  slug: string;
  body: any[];
  content?: string;
}

export interface FeaturedCards {
  icon: string;
  title: string;
  description: string;
  color: string;
  btnText: string;
  link?: string;
}

// TODO: Update this interface. It's used in the 'onSubmit' of the 'Profile' component.
export interface ReactGroup {
  _id: string;
  _type: string;
  name: string;
  slug: {
    current: string;
  };
  topic: string;
  studyMaterial: string;
  teamCaptain: {
    _type: string;
    _ref: string;
  };
  participants?: string;
  meetings: string;
  plan: string;
  startDate: string;
  status: string;
}
export interface Person {
  _id: string;
  username: {
    current: string;
  };
  discordID: string;
  photo:
    | {
        src: string;
        alt?: string;
      }
    | SanityImageSource;
  firstName?: string;
  lastName?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  portfolio?: string;
  github?: string;
  fecTeam?: boolean;
  timezone?: string;
  cmykParticipant?: CMYKParticipant[];
}

export interface Tweets {
  data: {
    id: string;
    text: string;
    in_reply_to_user_id: string;
    created_at: string;
    author_id: string;
    attachments: { media_keys: string[] };
    referenced_tweets: { type: 'quoted' | 'retweeted'; id: string }[];
    public_metrics: {
      retweet_count: number;
      reply_count: number;
      like_count: number;
      quote_count: number;
    };
  }[];
  includes: {
    users: {
      id: string;
      name: string;
      username: string;
      profile_image_url: string;
      protected: string;
      url: string;
      verified: boolean;
    }[];
    tweets: {
      id: string;
      attachments: { media_keys: string[] };
      text: string;
      in_reply_to_user_id: string;
      created_at: string;
      author_id: string;
    }[];
    media: {
      height: number;
      type: string;
      width: number;
      media_key: string;
      url: string;
      alt_text: string;
    }[];
  };
}

export interface EmbeddedTweet {
  media: {
    height: number;
    type: string;
    width: number;
    media_key: string;
    url: string;
    alt_text: string;
  }[];
  referenced_tweets: {
    id: string;
    attachments: { media_keys: string[] };
    text: string;
    in_reply_to_user_id: string;
    created_at: string;
    author_id: string;
    type: 'quoted' | 'retweeted';
    author: {
      id: string;
      name: string;
      username: string;
      profile_image_url: string;
      protected: string;
      url: string;
      verified: boolean;
    };
    media: {
      height: number;
      type: string;
      width: number;
      media_key: string;
      url: string;
      alt_text: string;
    }[];
  }[];
  author: {
    id: string;
    name: string;
    username: string;
    profile_image_url: string;
    protected: string;
    url: string;
    verified: boolean;
  };
  id: string;
  text: string;
  in_reply_to_user_id: string;
  created_at: string;
  author_id: string;
  attachments: { media_keys: string[] };
  public_metrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
  };
}

export interface Role {
  _id: string;
  name: string;
}

export interface Seniority {
  _id: string;
  name: string;
}

export interface Technology {
  _id: string;
  name: string;
}

export interface Technologies {
  id: string;
  name: string;
}

export interface ProfileFilters {
  roleId?: string;
  location?: string;
  seniorityId?: string;
  description?: string;
  technologies?: Technology[];
  available?: boolean;
  active?: boolean;
}

export interface Profile {
  _id: string;
  description: string;
  isAvailable: boolean;
  location: string;
  technologies: Technology[];
  person: {
    _id: string;
    discord: string;
    email: string;
    firstName: string;
    lastName: string;
    github: string;
    linkedin: string;
    photo: string;
    portfolio: string;
    twitter: string;
    username: string;
  };
  role: Role;
  seniority: Role;
}

export type Component = {
  _type: string;
  _key: string;
  [key: string]: any;
};

export interface Page {
  hero: string;
  title: string;
  shortDescription?: string;
  metadata?: Metadata[];
  description?: string;
  doc?: string;
  steps: Step[];
  components?: Component[];
}

export interface Step {
  _key: string;
  description: string;
  step: number;
  title: string;
}

export interface Metadata {
  _key: string;
  property: string;
  content: string;
}

export interface DiscordEvent {
  id: string;
  guild_id: string;
  channel_id: string;
  creator_id?: string;
  name: string;
  description?: string;
  scheduled_start_time: string;
  scheduled_end_time: string;
  privacy_level: string;
  status: string;
  entity_type: string;
  entity_id: string;
  entity_metadata: string;
  creator: string;
  user_count?: number;
  image?: string;
}

export interface EventChannel {
  id: string;
  name: string;
  category: { _ref: string; _type: 'reference' };
  defaultImage: { _type: 'image'; asset: { _ref: string; _type: 'reference' } };
  tags: [];
}

export type AppPage<
  T extends Record<string, unknown> = Record<string, unknown>,
> = (props: {
  params: T;
  searchParams?: { [key: string]: string | string[] | undefined };
}) => JSX.Element | Promise<JSX.Element>;

export type Layout<
  T extends Record<string, unknown> = Record<string, unknown | undefined>,
> = (props: {
  children: React.ReactNode;
  params: T;
}) => JSX.Element | Promise<JSX.Element>;

/**
 * Discord
 * {@link https://discord.com/developers/docs/resources/user#get-current-user-guilds | _Partial_ }
 * {@link https://discord.com/developers/docs/resources/guild#guild-object | Guild Object }
 */
export interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
  owner?: boolean;
  permissions?: string;
  features: string[];
}

/**
 * Discord
 * {@link https://discord.com/developers/docs/resources/guild#get-guild-member | Guild Member Object}.
 */
export interface DiscordFECMember {
  user?: DiscordUser;
  nick?: string | null;
  avatar?: string | null;
  roles: string[];
  joined_at: Date;
  premium_since?: Date | null;
  deaf: boolean;
  mute: boolean;
  flags: number;
  pending?: boolean;
  permissions?: string;
  communication_disabled_until?: Date | null;
}

/**
 * Discord
 * {@link https://discord.com/developers/docs/resources/user#user-object | User Object}.
 */
interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  banner?: string | null;
  accent_color: number;
  global_name: string | null;
  avatar_decoration: string | null;
  display_name: string | null;
  banner_color: string;
  flags: number;
  public_flags?: number;
}
