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
    };
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

export interface ReactGroup {
  _type: string;
  name: string;
  slug: {
    current: string;
  };
  topic: string;
  studyMaterial: string;
  teamCaptain: {
    id: string;
    _ref: string;
  }
  participants: string;
  meetings: string;
  plan: string;
  startDate: string;
}

export interface Person {
  _id: string;
  username: {
    current:  string;
  }
  firstName: string;
  lastName: string;
  linkedin: string;
  portfolio: string;
}
