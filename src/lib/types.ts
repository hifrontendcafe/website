import { TypedObject } from '@sanity/block-tools';
import { PortableTextTextBlock } from 'sanity';

export interface Image {
  _type: string;
  asset: Asset;
}

interface Asset {
  _ref: string;
  _type: string;
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
  description: (TypedObject | PortableTextTextBlock)[];
  tags: [];
}

export interface EventsSettings {
  automaticaticMigrationEnabled: boolean;
  sendEmailsOnMigration: boolean;
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

interface Metadata {
  _key: string;
  property: string;
  content: string;
}

/**
 * Discord
 * {@link https://discord.com/developers/docs/resources/guild-scheduled-event | Guild Scheduled Event Object}.
 */
export interface DiscordEvent {
  id: string;
  guild_id: string;
  channel_id: string | null;
  creator_id?: string | null;
  name: string;
  description?: string | null;
  scheduled_start_time: Date;
  scheduled_end_time: Date | null;
  privacy_level: number;
  status: 1 | 2 | 3 | 4;
  entity_type: 1 | 2 | 3;
  entity_id: string | null;
  entity_metadata: null;
  creator: DiscordUser;
  user_count?: number;
  image?: string | null;
  sku_ids: any[];
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
