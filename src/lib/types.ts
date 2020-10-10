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
  photo: {
    src: string;
    alt?: string;
  };
  web: string;
  calendly: string;
  linkedin: string;
  github: string;
  topic: [
    title: string,
  ]
}
