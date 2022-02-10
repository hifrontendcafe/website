import type { NextApiRequest, NextApiResponse } from 'next';

import { postClient } from '@/lib/sanity';
import { getPerson } from '@/lib/api';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method === 'POST') {
    const {
      name,
      id,
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
      roleId,
      available,
      description,
    } = req.body;

    // const tech: Technology[] = technologies.map((t) => ({
    //   id: t.value,
    // }));

    const person = await getPerson(discordId);

    let photoObj = {};

    if (photo) {
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

    if (id) {
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

      transaction.patch(id, {
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
        },
      });

      await transaction.commit();
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
      });

      await transaction.commit();
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

    await postClient.create({
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
    });

    res.json({});
  }
}
