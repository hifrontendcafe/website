import type { NextApiRequest, NextApiResponse } from 'next';
import { postClient } from '@/lib/sanity';
import { getPerson } from '@/lib/api';
import { profileQuery } from '@/lib/queries';
import { Profile } from '@/lib/types';

function isValidHttpUrl(string: string) {
  let url: URL;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method === 'POST') {
    const {
      name,
      email,
      discord,
      discordId,
      github,
      linkedin,
      portfolio,
      twitter,
      location,
      photo,
      seniorityId,
      technologies: selectedTechnologies,
      roleId,
      available,
      description,
    } = req.body;

    // const tech: Technology[] = technologies.map((t) => ({
    //   id: t.value,
    // }));

    const person = await getPerson(discordId);
    const profile = await postClient.fetch<Profile>(profileQuery, {
      id: discordId,
    });

    const technologies = selectedTechnologies.map((tech: { _id: string }) => ({
      _type: 'reference',
      _ref: tech._id,
      _key: tech._id,
    }));

    let photoObj;

    if (photo && !isValidHttpUrl(photo)) {
      const photoBlob = Buffer.from(photo.split(';base64,')[1], 'base64');

      const asset = await postClient.assets.upload('image', photoBlob);

      photoObj = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      };
    } else photoObj = undefined;

    if (profile._id) {
      const transaction = postClient.transaction();

      transaction.patch(person._id, {
        set: {
          firstName: name,
          email,
          twitter,
          portfolio,
          github,
          linkedin,
          username: discord,
          photo: photoObj,
        },
      });

      transaction.patch(profile._id, {
        set: {
          isAvailable: available,
          location,
          isActive: true,
          description,
          seniority: {
            _type: 'reference',
            _ref: seniorityId,
          },
          role: {
            _type: 'reference',
            _ref: roleId,
          },
          technologies,
        },
      });

      await transaction.commit({ autoGenerateArrayKeys: true });

      res.json({});

      return;
    }

    if (person._id) {
      const transaction = postClient.transaction();

      transaction.patch(person._id, {
        set: {
          firstName: name,
          email,
          twitter,
          portfolio,
          github,
          linkedin,
          username: discord,
          photo: photoObj,
        },
      });

      transaction.create({
        _type: 'profile',
        isAvailable: available,
        location,
        isActive: true,
        description,
        seniority: {
          _type: 'reference',
          _ref: seniorityId,
        },
        role: {
          _type: 'reference',
          _ref: roleId,
        },
        person: {
          _type: 'reference',
          _ref: person._id,
        },
        technologies,
      });

      await transaction.commit({ autoGenerateArrayKeys: true });
      res.json({});

      return;
    }

    const newPerson = await postClient.create({
      _type: 'person',
      firstName: name,
      email,
      twitter,
      portfolio,
      username: discord,
      discordID: {
        _type: 'slug',
        current: discordId,
      },
      github,
      linkedin,
      photo: photoObj,
    });

    await postClient.create(
      {
        _type: 'profile',
        isAvailable: available,
        location,
        isActive: true,
        description,
        seniority: {
          _type: 'reference',
          _ref: seniorityId,
        },
        role: {
          _type: 'reference',
          _ref: roleId,
        },
        person: {
          _type: 'reference',
          _ref: newPerson._id,
        },
        technologies,
      },
      { autoGenerateArrayKeys: true },
    );

    res.json({});
  }
}
