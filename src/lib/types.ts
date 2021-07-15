import NextAuth from 'next-auth';
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    };
  }
}
export interface Settings {
  description: string;
  heroBackground: Image;
  heroWords: string[];
  logo: Image;
  menu: string[];
  socialnetworks: SocialNetworks;
  title: string;
  cmykInscription: boolean;
}

export interface SocialNetworks {
  github: string;
  linkedin: string;
  twitch: string;
  twitter: string;
  youtube: string;
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
}

export interface CMYKParticipant {
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

export interface Doc {
  title: string;
  slug: string;
  body: string;
}

export interface FeaturedCards {
  icon: string;
  title: string;
  description: string;
  color: string;
  btnText: string;
  link: string;
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
  photo: {
    src: string;
    alt?: string;
  };
  firstName?: string;
  lastName?: string;
  emai?: string;
  linkedin?: string;
  twitter?: string;
  portfolio?: string;
  github?: string;
  fecTeam?: boolean;
}

export type Tweet = {
  id: string;
  text: string;
  in_reply_to_user_id: string;
};
