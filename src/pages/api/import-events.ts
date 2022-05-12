import { NextApiRequest, NextApiResponse } from 'next';
import { importDiscordEventsAutomatic } from '../../lib/api';

export default async function importEvent(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method === 'POST') {
    try {
      const resultImport = await importDiscordEventsAutomatic();
      if (resultImport) {
        res.status(200).json({ message: 'Ok' });
      } else {
        res.status(500).json({ message: 'Automatic migration is disabled' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Could not import discord events' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
