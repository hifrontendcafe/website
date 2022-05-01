import { getProfile } from '@/lib/api';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { uid } = req.query;

  let profile;
  try {
    profile = await getProfile(uid as string, req.preview);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: `Can't retrieve profile, error ${error}`,
    });
  }

  if (!profile._id) {
    res.status(404).send({ statusCode: 404, message: 'Profile not found' });
  }

  res.status(200).json(profile);
}
