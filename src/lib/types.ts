export interface Event {
  title: string;
  slug: string;
  category: {
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
  nombre: string;
  photo: {
    src: string;
    alt?: string;
  };
  calendly: string;
  linkedin: string;
  github: string;
  topic: [
    title: string,
  ]
}
