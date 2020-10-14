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

export interface Tweet {
  id: string;
  text: string;
}

export interface Mentor {
  name: string;
  description: string;
  photo: {
    src: string;
    alt?: string;
  };
  web: string;
  calendly: string;
  linkedin: string;
  github: string;
  topics: [
    {
      _key: string;
      _ref: string;
    }
  ]
}

export interface Topic {
  _id: string;
  title: string;
  description: string;
}
