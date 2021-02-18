import { NextApiRequest, NextApiResponse } from 'next';
import { getPersonByDiscordId, createPerson, addParticipantToReactGroup } from '../../lib/api';

export default async function post(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;

  let user = await getPersonByDiscordId(body.discordUser);

  if (!user) {
    user = await createPerson({
      username: { current: body.discordUser },
    });
  }

  try {
    addParticipantToReactGroup(body.id, user._id)
  } catch (e) {
    console.error(e);
  }
}
