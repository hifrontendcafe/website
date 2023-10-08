import event from './event';
import category from './category';
import tag from './tag';
import mentor from './mentor';
import profile from './profile';
import topic from './topic';
import doc from './doc';
import post from './post';
import person from './person';
import cmyk from './cmyk';
import reactGroup from './react-group';
import cmykParticipant from './cmyk-participant';
import featuredCards from './featuredCards';
import settings from './settings';
import page from './page';
import technology from './technology';
import role from './role';
import seniority from './seniority';
import eventChannels from './event-channels';
import eventsSettings from './eventsSettings';
import externalUrl from './externalUrl';
import navItem from './navItem';
import components from './components';
import fecCertificate from './fec-certificate';

const schemas = [
  /* components objects */
  ...components,

  /* Your types here! */
  settings,
  person,
  event,
  category,
  tag,
  mentor,
  profile,
  topic,
  role,
  seniority,
  doc,
  post,
  cmyk,
  reactGroup,
  cmykParticipant,
  featuredCards,
  page,
  technology,
  eventChannels,
  eventsSettings,
  externalUrl,
  navItem,
  fecCertificate,
];

export default schemas;
