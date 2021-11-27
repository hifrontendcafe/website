import { NextApiRequest, NextApiResponse } from 'next';
import { getAllAPIEvents } from '../../lib/api';

export default async function events(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const data = await getAllAPIEvents(false);
  res.status(200).json(data);
}
