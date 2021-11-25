import { NextApiRequest, NextApiResponse } from 'next';
import {
  getPersonByDiscordId,
  createPerson,
  addParticipantToReactGroup,
} from '../../lib/api';

export default async function post(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { body } = req;

  let user = await getPersonByDiscordId(body.discordUser);

  if (!user) {
    user = await createPerson({
      username: body.discordUser,
    });
  }

  try {
    await addParticipantToReactGroup(body.id, user._id);

    res.status(200).json({});
  } catch (e) {
    console.error(e);
    res.status(500);
  }
}
