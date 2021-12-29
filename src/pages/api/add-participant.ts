import { NextApiRequest, NextApiResponse } from 'next';
import { Person } from '../../lib/types';
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
  let user: Person;
  try {
    user = await getPersonByDiscordId(body.discordUser);
    if (!user) {
      user = await createPerson({
        username: body.discordUser,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Could not get user' });
    return;
  }

  try {
    await addParticipantToReactGroup(body.id, user._id);
    res.status(200).json({});
  } catch (e) {
    res.status(500).json({ message: 'Could not add participant' });
  }
}
