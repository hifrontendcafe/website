import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  }
  interface Profile {
    id: string;
    username: string;
    email: string;
    avatar: string;
    discriminator: string;
  }
}
