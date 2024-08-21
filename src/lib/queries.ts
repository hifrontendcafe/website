import groq from 'groq';

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    title,
    description,
    'navItems': navbar[]{
      _type == 'reference' => @->
        {
        _type == 'page' => {
          "link": path.current,
          "title":name
        },
        _type == 'externalUrl' => {
          "link":url,
          "title":name
        }
      }
    },
    'footerNavItems': footerNav[]{
      "title":text,
      "link": link->
        {
        _type == 'page' => {
          "value": path.current,
        },
        _type == 'externalUrl' => {
          "value":url,
        }
      }
    },
    logo,
    heroBackground,
    heroWords,
    heroSubtitle,
    heroDescription,
    discordButtonLabel,
    iniciativasButtonText,
    socialnetworks,
    cmykSettings
  }
`;

export const pageQueryByName = groq`
  *[_type == "page" && name == $name][0]{
    hero,
    title,
    'shortDescription': coalesce(shortDescription, ''),
    'description': coalesce(description, ''),
    'doc': coalesce(doc, ''),
    metadata,
    steps,
    components
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
    endDate,
    tags,
    recording,
    description
  }
`;

export const futureEventsDiscordIdQuery = groq`
  *[_type == "event" && dateTime(now()) <= dateTime(date) && discordId != null] {
    discordId,
  }
`;

export const eventChannelsQuery = groq`
  *[_type == "eventChannel"] {
    id,
    name,
    category,
    defaultImage,
    tags
  }
`;

export const eventsSettingsQuery = groq`
  *[_type == "eventsSettings"][0]{
    automaticaticMigrationEnabled,
    sendEmailsOnMigration
  }
`;

export const mentorQuery = groq`
  *[_type == 'mentor' && persona-> discordID.current == $id][0] {
    _id,
    name,
    description,
    photo,
    status,
    web,
    calendly,
    github,
    twitter,
    linkedin,
    topics[]->
  }
`;

export const mentorsTopicsQuery = groq`
  *[_type == "topic"] | order(title asc) {
    description,
    _id,
    title
  }
`;

export const mentorsQuery = groq`
  *[_type == "mentor" && status in ["ACTIVE", "NOT_AVAILABLE"]] | order(status asc) {
    'id': persona-> discordID.current,
    name,
    description,
    'photo': {
      'alt': photo.alt,
      'src': photo.asset->url
    },
    status,
    web,
    calendly,
    github,
    twitter,
    linkedin,
    topics[]->
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
  *[_type == "cmyk"] | order(cmykVersion desc) {
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

export const pageByPathQuery = groq`
  *[_type == "page" && path.current == $path][0]{
    hero,
    title,
    'shortDescription': coalesce(shortDescription, ''),
    'description': coalesce(description, ''),
    'doc': coalesce(doc, ''),
    metadata,
    components
  }
`;
