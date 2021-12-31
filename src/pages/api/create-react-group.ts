import { NextApiRequest, NextApiResponse } from 'next';
import { Person } from '../../lib/types';
import {
  createReactGroup,
  createPerson,
  getPersonByRealDiscordID,
} from '../../lib/api';

export default async function post(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { group, captain } = req.body;
  let user: Person;
  try {
    user = await getPersonByRealDiscordID(captain.id);
    if (!user) {
      user = await createPerson({
        username: captain.name,
        discordID: {
          _type: 'slug',
          current: captain.id,
        },
        email: captain.email,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Could not get user' });
    return;
  }
  try {
    const reactGroup = await createReactGroup({
      ...group,
      teamCaptain: {
        _type: 'reference',
        _ref: user._id,
      },
      status: 'draft',
    });

    res.status(200).json(reactGroup);
  } catch (error) {
    res.status(500).json({ message: 'Could not create group' });
  }
}
