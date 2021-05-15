import { groq } from 'next-sanity';

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    title,
    "description": description[$locale],
    "menu": menu[].[$locale],
    logo,
    heroBackground,
    heroWords,
    socialnetworks,
    cmykInscription
  }
`;

export const eventsQuery = groq`
  *[_type == "event"] | order(date desc) {
    title,
    'slug': slug.current,
    'category': {
      'name': category->name,
    },
    'cover': {
      'alt': cover.alt,
      'src': cover.asset->url
    },
    date,
    tags,
    recording,
    description
  }
`;

export const eventsQueryByType = groq`
  *[_type == "event" && category->name == $categoryFilter && dateTime(now()) < dateTime(date)] | order(date asc) {
    title,
    'slug': slug.current,
    'category': {
      'name': category->name,
    },
    'cover': {
      'alt': cover.alt,
      'src': cover.asset->url
    },
    date,
    tags,
    recording,
    description
  }
`;

export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    name,
    title,
    date,
    excerpt,
    slug,
    'coverImage': coverImage.asset->url,
    'author': author->{name, 'picture': picture.asset->url},
    content
  }
`;

export const postsQuery = groq`
  *[_type == "post" ] | order(date desc) {
    name,
    title,
    date,
    excerpt,
    slug,
    'coverImage': coverImage.asset->url,
    'author': author->{name, 'picture': picture.asset->url},
    content
  }
`;

export const mentorsTopicsQuery = groq`
  *[_type == "topic"] | order(date desc) {
    topics,
    _id,
    title
  }
`;

export const mentorsQuery = groq`
  *[_type == "mentor"] | order(date desc) {
    name,
    description,
    'photo': {
      'alt': photo.alt,
      'src': photo.asset->url
    },
    isActive,
    web,
    calendly,
    github,
    linkedin,
    topics
  }
`;

export const docsQuery = groq`
  *[_type == "docs" ] | order(date desc) {
    title,
    'slug': slug.current,
    body
  }
`;

export const docQuery = groq`
  *[_type == "docs" && slug.current == $slug][0]{
    title,
    'slug': slug.current,
    body
  }
`;

export const cmykQuery = groq`
  *[_type == "cmyk"] {
    _id,
    name,
    description,
    'color': color.hex,
    'image': {
      'src': image.asset->url
    },
    github,
    demo
  }
`;

export const personQuery = groq`
  *[_type == "person" && username == $id]{
    _id,
    username,
    firstName,
    lastName,
  }
`;

export const reactGroupQuery = groq`
*[_type == 'reactGroup' && status == 'approved']{
    _id,
    name,
    'teamCaptain': teamCaptain->username,
    participants,
    topic,
    studyMaterial,
    meetings,
    plan,
    startDate,
    slug
  }
`;

export const featuredCardsQuery = groq`
  *[_type == 'featuredCards'] {
    _id,
    icon,
    title,
    description,
    'color': color.hex,
    link,
    btnText
  }
  `;
