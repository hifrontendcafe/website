export interface Settings {
  description: string;
  heroBackground: Image;
  heroWords: string[];
  logo: Image;
  navItems: NavItemData[];
  socialnetworks: SocialNetworks;
  title: string;
  cmykInscription: boolean;
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
  description: string;
  recording?: string;
}

export interface Mentor {
  name: string;
  description: string;
  photo: {
    src: string;
    alt?: string;
  };
  isActive: boolean;
  web: string;
  calendly: string;
  linkedin: string;
  github: string;
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
  participationLevel: string;
  aboutParticipant: string;
  previousKnowledge: string;
  experience: string;
  timeAvailability: string;
  otherQuestions: string;
  cmykVersion: string;
  status: string;
}

export interface Topic {
  _id: string;
  title: string;
  description: string;
}

export interface Author {
  name: string;
  picture: string;
}

export interface Post {
  _id: string;
  title: string;
  author: Author;
  slug: {
    current: string;
  };
  coverImage: string;
  date: string;
  excerpt: string;
  content: any;
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
  body: string;
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
  photo: {
    src: string;
    alt?: string;
  };
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
  person: {
    _id: string;
    discord: string;
    email: string;
    firstName: string;
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

export interface Page {
  hero: string;
  title: string;
  shortDescription?: string;
  metadata?: Metadata[];
  description?: string;
  doc?: string;
  steps: Step[];
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
