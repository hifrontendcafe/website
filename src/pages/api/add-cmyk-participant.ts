import { NextApiRequest, NextApiResponse } from 'next';
import {
  getPersonByDiscordId,
  createPerson,
  createCMYKMember,
} from '../../lib/api';

export default async function post(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  let user = await getPersonByDiscordId(body.discordUser);
  if (!user) {
    try {
      user = await createPerson({
        username: body.discordUser,
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        github: body.github,
        linkedin: body.linkedIn,
      });
    } catch (error) {
      console.log(error);
    }
  }

  try {
    const cmykMember = await createCMYKMember({
      discordUser: {
        _type: 'reference',
        _ref: user._id,
      },
      participationLevel: body.participationLevel,
      aboutMember: body.aboutMember,
      experience: body.experience,
      otherQuestions: body.otherQuestions,
      previousKnowledge: body.previousKnowledge,
      timeAvailability: body.timeAvailability,
      status: 'revision',
    });

    res.status(200).json(cmykMember);
  } catch (e) {
    res.status(500);
  }
}
