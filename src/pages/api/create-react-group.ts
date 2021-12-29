import { NextApiRequest, NextApiResponse } from 'next';
import { Person } from '../../lib/types';
import {
  getPersonByDiscordId,
  createReactGroup,
  createPerson,
} from '../../lib/api';

export default async function post(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { body } = req;
  let user: Person;
  try {
    user = await getPersonByDiscordId(body.teamCaptain.id);
    if (!user) {
      user = await createPerson({
        username: body.teamCaptain.id,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Could not get user' });
    return;
  }
  try {
    const reactGroup = await createReactGroup({
      ...body,
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
