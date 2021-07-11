import { groq } from 'next-sanity';

export const mentorsSchedule = groq`
  *[_type == "mentor"]{
    name,
    'slug': {
      current
    },
  }
`;
