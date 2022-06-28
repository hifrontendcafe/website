import { NextApiRequest, NextApiResponse } from 'next';
import {
  createPerson,
  createCMYKParticipant,
  updatePerson,
  getPersonByDiscordID,
} from '../../lib/api';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function post(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  try {
    const user = await getPersonByDiscordID(body.discordID);
    let newUser;
    // If user does not existe create it
    if (!user) {
      newUser = await createPerson({
        username: body.discordUser,
        discordID: {
          _type: 'slug',
          current: body.discordID,
        },
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        timezone: body.timezone,
        github: body.github,
        twitter: body.twitter,
        linkedin: body.linkedIn,
      });
      // if User exists and is not registered as cmykParticipant, update it
    } else if (user && user.cmykParticipant.length === 0) {
      newUser = await updatePerson(user._id, {
        username: body.discordUser,
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        timezone: body.timezone,
        github: body.github,
        twitter: body.twitter,
        linkedin: body.linkedIn,
      });
    }
    // If user is not registered as cmykParticipant, register it
    if (!user || user.cmykParticipant.length === 0) {
      const newCMYKParticipant = await createCMYKParticipant({
        discordUser: {
          _type: 'reference',
          _ref:
            !user || user.cmykParticipant.length === 0 ? newUser._id : user._id,
        },
        formType: body.formType,
        isChix: body.isChix,
        experience: body.experience,
        workExperience: body.workExperience,
        stackWanted: body.stackWanted,
        timeAvailability: body.timeAvailability,
        projects: body.projects,
        previousKnowledge: body.previousKnowledge,
        aboutParticipant: body.aboutParticipant,
        otherQuestions: body.otherQuestions,
        cmykVersion: '5',
        status: 'revision',
      });
      // If user is already registered
      return res.status(200).json({ status: 'registered', newCMYKParticipant });
    }
    return res.status(200).json({
      status: 'already registered',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
