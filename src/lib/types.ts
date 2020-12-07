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
