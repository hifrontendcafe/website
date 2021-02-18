import { NextApiRequest, NextApiResponse } from 'next';
import { getPersonByDiscordId, createPerson } from '../../lib/api';
import { postClient } from '../../lib/sanity';

export default async function post(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;

  let user = await getPersonByDiscordId(body.discordUser);

  if (!user) {
    user = await createPerson({
      username: { current: body.discordUser },
    });
  }

  try {
    postClient
      .patch(body.id)
      .setIfMissing({ participants: [] })
      .insert('after', 'participants[-1]', [
        {
          _key: user._id,
          _ref: user._id,
          _type: 'reference',
        },
      ])
      .commit();
  } catch (e) {
    console.error(e);
  }
}
