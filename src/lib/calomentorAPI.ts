import client, { postClient } from './calomentorSanity';

// Queries Imports
import { mentorsSchedule } from './calomentorQueries';

type mentorSchedule = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
};
export const getAllMentorSchedules = async (): Promise<mentorSchedule> => {
  return await client.fetch(mentorsSchedule);
};
