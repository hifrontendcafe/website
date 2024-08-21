import { getProfile } from '@/lib/sanity/profile/getProfile';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { uid } = req.query;

  if (!uid || typeof uid !== 'string') {
    return res
      .status(404)
      .send({ statusCode: 404, message: 'Profile not found' });
  }

  let profile;
  try {
    profile = await getProfile(uid);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: `Can't retrieve profile, error ${error}`,
    });
  }

  if (!profile?._id) {
    res.status(404).send({ statusCode: 404, message: 'Profile not found' });
  }

  res.status(200).json(profile);
}
