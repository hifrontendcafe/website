import { NextApiRequest, NextApiResponse } from 'next';
import { importEvents } from '../../lib/api';

export default async function importEvent(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method === 'POST') {
    try {
      await importEvents();
      res.status(200).json({ message: 'Ok' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Could not import discord events' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
