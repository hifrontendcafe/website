import { groq } from 'next-sanity';

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    title,
    description,
    menu,
    logo,
    heroBackground,
    heroWords,
    socialnetworks,
    cmykInscription
  }
`;

export const eventsQuery = groq`
  *[_type == "event" && category->name != "Práctica de inglés"] | order(date desc) {
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
    body,
    content
  }
`;

export const docQuery = groq`
  *[_type == "docs" && slug.current == $slug][0]{
    title,
    'slug': slug.current,
    body,
    content
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
    demo,
    cmykVersion
  }
`;

export const personQueryByDiscordID = groq`
  *[_type == "person" &&  discordID.current == $id]{
    _id,
    username,
    discordID,
    "cmykParticipant": *[_type=="cmykParticipant" && references(^._id)]
  }
`;

export const staffQuery = groq`
  *[_type == "person" && fecTeam] | order(_id desc){
    _id,
    username,
    firstName,
    lastName,
    linkedin,
    'photo': {
      'src': photo.asset->url
    },
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

export const technologiesQuery = groq`
  *[_type == 'technology'] {
    _id,
    name
  }
`;

export const senioritiesQuery = groq`
  *[_type == 'seniority'] {
    _id,
    name
  }
`;

export const rolesQuery = groq`
  *[_type == 'role'] {
    _id,
    name
  }
`;

export const profilesProjections = `
   _id,
   description,
   location,
   isAvailable,
   role-> {
     _id,
     name
   },
   person-> {
     "discord": discordID.current,
     email,
     firstName,
     github,
     linkedin,
     "photo": photo.asset->url,
     portfolio,
     twitter,
     username
   },
   seniority-> {
     _id,
     name
   }
`;

export const profilesQuery = `
  *[_type == "profile" && isActive == true] {
   ${profilesProjections}
 }
`;

export const profileQuery = `
  *[_type == "profile" && isActive == true && person->discordID.current == $id][0] {
   ${profilesProjections}
 }
`;

export const personQuery = groq`
  *[_type == "person" && discordID.current == $id][0] {
    _id,
    email,
    firstName,
    github,
    linkedin,
    photo,
    portfolio,
    twitter,
    username
 }
`;
