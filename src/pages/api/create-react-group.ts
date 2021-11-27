import { NextApiRequest, NextApiResponse } from 'next';
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

  let user = await getPersonByDiscordId(body.teamCaptain.id);
  if (!user) {
    user = await createPerson({
      username: body.teamCaptain.id,
    });
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
  } catch (e) {
    res.status(500);
  }
}
