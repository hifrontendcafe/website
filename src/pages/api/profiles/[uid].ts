import { getProfile } from '@/lib/api';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { uid } = req.query;
  const profile = await getProfile(uid as string, req.preview);

  if (!profile._id) {
    res.json({ error: true });
    return;
  }

  res.json({ ...profile, error: false });
}
