import { NextApiRequest, NextApiResponse } from 'next';
import { Person } from '../../lib/types';
import {
  createPerson,
  addParticipantToReactGroup,
  getPersonByRealDiscordID,
} from '../../lib/api';

export default async function post(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { body } = req;
  const { participant } = body;
  let user: Person;
  try {
    user = await getPersonByRealDiscordID(participant.id);
    if (!user) {
      user = await createPerson({
        username: participant.name,
        discordID: {
          _type: 'slug',
          current: participant.id,
        },
        email: participant.email,
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
