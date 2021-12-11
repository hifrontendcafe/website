import { NextApiRequest, NextApiResponse } from 'next';
import {
  getPersonByDiscordId,
  createReactGroup,
  createPerson,
} from '../../lib/api';

type Awaited<T> = T extends Promise<infer R> ? R : T;

export default async function post(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { body } = req;

  let user: Awaited<ReturnType<typeof getPersonByDiscordId>>;

  try {
    user = await getPersonByDiscordId(body.teamCaptain.id);
    if (!user) {
      user = await createPerson({
        username: body.teamCaptain.id,
      });
    }
  } catch (error) {
    console.error(`Can't get user.`, error);
    res.status(500).send(null);
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
  } catch (e) {
    console.error(e);
    res.status(500).send(null);
  }
}
