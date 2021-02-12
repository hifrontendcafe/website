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
  topic: string;
  studyMaterial: string;
  teamLeader: string;
  teamMembers: string;
  meetingType: string;
  plan: string;
  date: string;
}
