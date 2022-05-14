import { ComponentStory, ComponentMeta } from '@storybook/react';
import { EmbeddedTweet } from '@/lib/types';
import MediaFeedComponent from './index';

const tweets = [
  {
    referenced_tweets: [
      {
        type: 'quoted',
        author: {
          profile_image_url:
            'https://pbs.twimg.com/profile_images/1520785147045371904/YIexyxZu_normal.jpg',
          name: '⟠ juancito.eth',
          url: '',
          protected: false,
          verified: false,
          username: 'juanscolari',
          id: '245169246',
        },
        media: [],
        id: '1525254143182622731',
        attachments: { media_keys: ['3_1525254134726787094'] },
        public_metrics: {
          retweet_count: 1,
          reply_count: 1,
          like_count: 24,
          quote_count: 1,
        },
        text: 'Decime que estás en Córdoba sin decirme que estás en Córdoba https://t.co/RBcLXbyYUe',
        author_id: '245169246',
        created_at: '2022-05-13T23:18:20.000Z',
      },
    ],
    id: '1525256386640285696',
    public_metrics: {
      retweet_count: 1,
      reply_count: 0,
      like_count: 12,
      quote_count: 0,
    },
    text: 'Córdoba ❤️ https://t.co/PC6jWoifiN',
    author_id: '1196333675958460416',
    created_at: '2022-05-13T23:27:15.000Z',
    media: [],
    author: {
      profile_image_url:
        'https://pbs.twimg.com/profile_images/1455647573876805633/Qet3auj0_normal.jpg',
      name: 'FrontendCafé',
      url: 'https://t.co/7l8AmoKSoR',
      protected: false,
      verified: false,
      username: 'FrontendCafe',
      id: '1196333675958460416',
    },
  },
  {
    referenced_tweets: [
      {
        type: 'retweeted',
        author: {
          profile_image_url:
            'https://pbs.twimg.com/profile_images/1377353524661604356/DIMdJND1_normal.jpg',
          name: 'Quincy Larson',
          url: 'https://t.co/1Bjrckjl2u',
          protected: false,
          verified: true,
          username: 'ossia',
          id: '341643950',
        },
        media: [],
        id: '1525145724505272320',
        attachments: { media_keys: ['3_1525140291761627138'] },
        public_metrics: {
          retweet_count: 249,
          reply_count: 38,
          like_count: 1263,
          quote_count: 43,
        },
        text: "Announcement: After 3 years of development – and months of beta testing – freeCodeCamp's new Responsive Web Design certification is now live. 🎉\n\nI strongly recommend doing this new cert – even if you've already finished the old one.\n\n[FAQ thread 🧵] https://t.co/WXtlo2oTIr",
        author_id: '341643950',
        created_at: '2022-05-13T16:07:31.000Z',
      },
    ],
    id: '1525158911053025280',
    public_metrics: {
      retweet_count: 249,
      reply_count: 0,
      like_count: 0,
      quote_count: 0,
    },
    text: "RT @ossia: Announcement: After 3 years of development – and months of beta testing – freeCodeCamp's new Responsive Web Design certification…",
    author_id: '1196333675958460416',
    created_at: '2022-05-13T16:59:55.000Z',
    media: [],
    author: {
      profile_image_url:
        'https://pbs.twimg.com/profile_images/1455647573876805633/Qet3auj0_normal.jpg',
      name: 'FrontendCafé',
      url: 'https://t.co/7l8AmoKSoR',
      protected: false,
      verified: false,
      username: 'FrontendCafe',
      id: '1196333675958460416',
    },
  },
  {
    referenced_tweets: [
      {
        type: 'retweeted',
        author: {
          profile_image_url:
            'https://pbs.twimg.com/profile_images/1444988463216922631/IDffhy4i_normal.jpg',
          name: 'Kent C. Dodds 💿',
          url: 'https://t.co/2Zzqk7yHjs',
          protected: false,
          verified: false,
          username: 'kentcdodds',
          id: '389681470',
        },
        referenced_tweets: [{ type: 'quoted', id: '1525142738382950400' }],
        id: '1525157665319505921',
        public_metrics: {
          retweet_count: 6,
          reply_count: 12,
          like_count: 136,
          quote_count: 3,
        },
        text: 'Remix was open sourced only 6 months ago folks, and recruiters are already asking for it 🤯 https://t.co/Cv6XnEVfXI',
        author_id: '389681470',
        created_at: '2022-05-13T16:54:58.000Z',
      },
    ],
    id: '1525158831524876288',
    public_metrics: {
      retweet_count: 6,
      reply_count: 0,
      like_count: 0,
      quote_count: 0,
    },
    text: 'RT @kentcdodds: Remix was open sourced only 6 months ago folks, and recruiters are already asking for it 🤯',
    author_id: '1196333675958460416',
    created_at: '2022-05-13T16:59:36.000Z',
    media: [],
    author: {
      profile_image_url:
        'https://pbs.twimg.com/profile_images/1455647573876805633/Qet3auj0_normal.jpg',
      name: 'FrontendCafé',
      url: 'https://t.co/7l8AmoKSoR',
      protected: false,
      verified: false,
      username: 'FrontendCafe',
      id: '1196333675958460416',
    },
  },
  {
    id: '1524785244385202177',
    attachments: { media_keys: ['3_1524785239972790272'] },
    public_metrics: {
      retweet_count: 2,
      reply_count: 0,
      like_count: 6,
      quote_count: 1,
    },
    text: '¿Qué es el éxito para ustedes? 🚀 ¿Qué consideran necesario para ser exitoses? \nVamos a hablar sobre esto, y mucho más, en ingles. \n\n✅ Charlamos en grupo, nos conocemos y practicamos el idioma.\nLes esperamos hoy! 🙌\n\nInfo 🔗 https://t.co/T64CQwJ0nB\n\n#eventosFEC https://t.co/sj1LwTEjN6',
    author_id: '1196333675958460416',
    created_at: '2022-05-12T16:15:06.000Z',
    media: [
      {
        height: 2400,
        type: 'photo',
        url: 'https://pbs.twimg.com/media/FSkgGNtWQAAnXpo.jpg',
        media_key: '3_1524785239972790272',
        width: 2400,
      },
    ],
    referenced_tweets: [],
    author: {
      profile_image_url:
        'https://pbs.twimg.com/profile_images/1455647573876805633/Qet3auj0_normal.jpg',
      name: 'FrontendCafé',
      url: 'https://t.co/7l8AmoKSoR',
      protected: false,
      verified: false,
      username: 'FrontendCafe',
      id: '1196333675958460416',
    },
  },
  {
    referenced_tweets: [
      {
        type: 'retweeted',
        author: {
          profile_image_url:
            'https://pbs.twimg.com/profile_images/1524659589341499393/TTSljhzI_normal.jpg',
          name: 'Tavo',
          url: '',
          protected: false,
          verified: false,
          username: 'gd_tavo',
          id: '884554416',
        },
        id: '1524659184595259392',
        public_metrics: {
          retweet_count: 8,
          reply_count: 3,
          like_count: 11,
          quote_count: 0,
        },
        text: 'Hola, como están! Buscamos dos Devs\n-Backend PHP/Symfony\n-Frontend Next.js\nProyecto de 4/6 meses, part time, con posibilidad de colaborar en otros proyectos. Exp 3 años. NO se requiere inglés. 100% remoto. Sueldo en €. Interesados enviar a gustavo.perez@mytaskpanel.com. Gracias!',
        author_id: '884554416',
        created_at: '2022-05-12T07:54:11.000Z',
      },
    ],
    id: '1524725088167219202',
    public_metrics: {
      retweet_count: 8,
      reply_count: 0,
      like_count: 0,
      quote_count: 0,
    },
    text: 'RT @gd_tavo: Hola, como están! Buscamos dos Devs\n-Backend PHP/Symfony\n-Frontend Next.js\nProyecto de 4/6 meses, part time, con posibilidad d…',
    author_id: '1196333675958460416',
    created_at: '2022-05-12T12:16:03.000Z',
    media: [],
    author: {
      profile_image_url:
        'https://pbs.twimg.com/profile_images/1455647573876805633/Qet3auj0_normal.jpg',
      name: 'FrontendCafé',
      url: 'https://t.co/7l8AmoKSoR',
      protected: false,
      verified: false,
      username: 'FrontendCafe',
      id: '1196333675958460416',
    },
  },
  {
    referenced_tweets: [
      {
        type: 'retweeted',
        author: {
          profile_image_url:
            'https://pbs.twimg.com/profile_images/1013093704897163269/L7KU9J72_normal.jpg',
          name: 'Derrick L Johnson',
          url: 'https://t.co/9HHEYuu6YG',
          protected: false,
          verified: false,
          username: 'derrickljohnson',
          id: '28354574',
        },
        id: '1524534775742050304',
        public_metrics: {
          retweet_count: 372,
          reply_count: 257,
          like_count: 1175,
          quote_count: 21,
        },
        text: 'Hiring for a part time contract UI/UX designer\n\nif thats you DM or 👋🏽',
        author_id: '28354574',
        created_at: '2022-05-11T23:39:49.000Z',
      },
    ],
    id: '1524723793100476416',
    public_metrics: {
      retweet_count: 372,
      reply_count: 0,
      like_count: 0,
      quote_count: 0,
    },
    text: 'RT @derrickljohnson: Hiring for a part time contract UI/UX designer\n\nif thats you DM or 👋🏽',
    author_id: '1196333675958460416',
    created_at: '2022-05-12T12:10:54.000Z',
    media: [],
    author: {
      profile_image_url:
        'https://pbs.twimg.com/profile_images/1455647573876805633/Qet3auj0_normal.jpg',
      name: 'FrontendCafé',
      url: 'https://t.co/7l8AmoKSoR',
      protected: false,
      verified: false,
      username: 'FrontendCafe',
      id: '1196333675958460416',
    },
  },
  {
    referenced_tweets: [
      {
        type: 'retweeted',
        author: {
          profile_image_url:
            'https://pbs.twimg.com/profile_images/1442606526426804224/Lc7ZVjUQ_normal.jpg',
          name: 'Churrosoft',
          url: 'https://t.co/Iysxkfeaak',
          protected: false,
          verified: false,
          username: 'churrosoft',
          id: '1421213404392529922',
        },
        media: [],
        id: '1522783960656490496',
        attachments: { media_keys: ['7_1522783017038749698'] },
        public_metrics: {
          retweet_count: 5,
          reply_count: 0,
          like_count: 11,
          quote_count: 3,
        },
        text: '¿Sabías de las cosas buenas que se vienen en Churrosoft?\n\nHacemos tecnología y estamos entusiasmados por mostrarles nuestros proyectos 🏗️.\n\nSeguinos en twitter para mas novedades y avances.\n\n#openefi #tecnologia #latinoamerica #argentina #electronica #software #hardware https://t.co/Z5kGDp6QEs',
        author_id: '1421213404392529922',
        created_at: '2022-05-07T03:42:42.000Z',
      },
    ],
    id: '1524594879396925443',
    public_metrics: {
      retweet_count: 5,
      reply_count: 0,
      like_count: 0,
      quote_count: 0,
    },
    text: 'RT @churrosoft: ¿Sabías de las cosas buenas que se vienen en Churrosoft?\n\nHacemos tecnología y estamos entusiasmados por mostrarles nuestro…',
    author_id: '1196333675958460416',
    created_at: '2022-05-12T03:38:39.000Z',
    media: [],
    author: {
      profile_image_url:
        'https://pbs.twimg.com/profile_images/1455647573876805633/Qet3auj0_normal.jpg',
      name: 'FrontendCafé',
      url: 'https://t.co/7l8AmoKSoR',
      protected: false,
      verified: false,
      username: 'FrontendCafe',
      id: '1196333675958460416',
    },
  },
  {
    referenced_tweets: [
      {
        type: 'retweeted',
        author: {
          profile_image_url:
            'https://pbs.twimg.com/profile_images/1474164370519244810/aA72-Ge-_normal.jpg',
          name: 'Luis Sar 𓃵',
          url: '',
          protected: false,
          verified: false,
          username: 'LuisantonioAoks',
          id: '2332868024',
        },
        referenced_tweets: [{ type: 'replied_to', id: '1524444757539307522' }],
        id: '1524465778170417157',
        public_metrics: {
          retweet_count: 2,
          reply_count: 1,
          like_count: 10,
          quote_count: 0,
        },
        text: '@natsumiangello En comunidades como por ejemplo @FrontendCafe  tienen sus días de inglés y se me hace chida esa opción',
        author_id: '2332868024',
        created_at: '2022-05-11T19:05:39.000Z',
        in_reply_to_user_id: '776231771834683396',
      },
    ],
    id: '1524485856546934790',
    public_metrics: {
      retweet_count: 2,
      reply_count: 0,
      like_count: 0,
      quote_count: 0,
    },
    text: 'RT @LuisantonioAoks: @natsumiangello En comunidades como por ejemplo @FrontendCafe  tienen sus días de inglés y se me hace chida esa opción',
    author_id: '1196333675958460416',
    created_at: '2022-05-11T20:25:26.000Z',
    media: [],
    author: {
      profile_image_url:
        'https://pbs.twimg.com/profile_images/1455647573876805633/Qet3auj0_normal.jpg',
      name: 'FrontendCafé',
      url: 'https://t.co/7l8AmoKSoR',
      protected: false,
      verified: false,
      username: 'FrontendCafe',
      id: '1196333675958460416',
    },
  },
  {
    referenced_tweets: [
      {
        type: 'retweeted',
        author: {
          profile_image_url:
            'https://pbs.twimg.com/profile_images/1513591382958612480/9Q-r20M7_normal.jpg',
          name: 'Sailor Recruiter 💫',
          url: '',
          protected: false,
          verified: false,
          username: 'vickycharra',
          id: '233603529',
        },
        id: '1524421066197770240',
        public_metrics: {
          retweet_count: 44,
          reply_count: 2,
          like_count: 104,
          quote_count: 4,
        },
        text: '📣 Voy a estar ayudando a atlas a armar sus equipos de  Engineering, Sales, Customer Success, Operations ✨\nSale 🧵contando detalles de la empresa, roles y beneficios. Like+RT asi llegamos a mas gente, si no sos vos tal vez a alguien de tus redes le sirve. \nDMs abiertos!',
        author_id: '233603529',
        created_at: '2022-05-11T16:07:59.000Z',
      },
    ],
    id: '1524476047294619649',
    public_metrics: {
      retweet_count: 44,
      reply_count: 0,
      like_count: 0,
      quote_count: 0,
    },
    text: 'RT @vickycharra: 📣 Voy a estar ayudando a atlas a armar sus equipos de  Engineering, Sales, Customer Success, Operations ✨\nSale 🧵contando d…',
    author_id: '1196333675958460416',
    created_at: '2022-05-11T19:46:27.000Z',
    media: [],
    author: {
      profile_image_url:
        'https://pbs.twimg.com/profile_images/1455647573876805633/Qet3auj0_normal.jpg',
      name: 'FrontendCafé',
      url: 'https://t.co/7l8AmoKSoR',
      protected: false,
      verified: false,
      username: 'FrontendCafe',
      id: '1196333675958460416',
    },
  },
];

export default {
  title: 'Components/MediaFeed',
  component: MediaFeedComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof MediaFeedComponent>;

const Template: ComponentStory<typeof MediaFeedComponent> = (args) => (
  <>
    <div className="w-full min-h-screen bg-zinc-900">
      <div id="container" className="container relative pt-12 mx-auto">
        <MediaFeedComponent {...args} />
      </div>
    </div>
  </>
);

export const MediaFeed = Template.bind({});

MediaFeed.args = {
  tweets,
};

MediaFeed.argTypes = {};
