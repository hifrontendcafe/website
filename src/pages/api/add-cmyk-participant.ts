import { NextApiRequest, NextApiResponse } from 'next';
import {
  createPerson,
  createCMYKParticipant,
  updatePerson,
  getPersonByRealDiscordID,
} from '../../lib/api';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function post(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  try {
    const user = await getPersonByRealDiscordID(body.discordID);
    let newUser;
    // If user does not existe create it
    if (!user.username) {
      newUser = await createPerson({
        username: body.discordUser,
        discordID: {
          _type: 'slug',
          current: body.discordID,
        },
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        github: body.github,
        twitter: body.twitter,
        linkedin: body.linkedIn,
      });
      // if User exists and is not registered as cmykParticipant, update it
    } else if (user.username && user.cmykParticipant?.length === 0) {
      newUser = await updatePerson(user._id, {
        username: body.discordUser,
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        github: body.github,
        twitter: body.twitter,
        linkedin: body.linkedIn,
      });
    }
    // If user is not registered as cmykParticipant, register it
    if (!user.cmykParticipant || user.cmykParticipant?.length === 0) {
      const newCMYKParticipant = await createCMYKParticipant({
        discordUser: {
          _type: 'reference',
          _ref: user.cmykParticipant ? user._id : newUser._id,
        },
        participationLevel: body.participationLevel,
        aboutParticipant: body.aboutParticipant,
        experience: body.experience,
        otherQuestions: body.otherQuestions,
        previousKnowledge: body.previousKnowledge,
        timeAvailability: body.timeAvailability,
        status: 'revision',
      });
      return res.status(200).json({ status: 'registered', newCMYKParticipant });
    }
    return res.status(200).json({
      status: 'already registered',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
