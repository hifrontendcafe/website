'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getMentor } from '@/lib/api.server';
import { postClient } from '@/lib/sanity';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function photoUploadAction(_id: string, photo: string) {
  const photoBlob = Buffer.from(photo.split(';base64,')[1], 'base64');
  // TODO: Delete the previous photo and then upload the new one.
  const asset = await postClient.assets.upload('image', photoBlob);

  postClient
    .patch(_id, {
      set: {
        photo: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        },
      },
    })
    .commit()
    .then(() => {
      console.log('Done!');
    })
    .catch((error) => console.log({ error }));
}

export async function mentorFormAction(id: string, formData: FormData) {
  const session = getServerSession(authOptions);
  const mentor = await getMentor({ id });
  if (!session || !mentor) return;

  const topicsRefs = formData
    .getAll('topics')
    .filter((topic) => topic.length && !!topic)
    .map((topic) => ({
      _ref: topic as string,
      _type: 'reference',
    }));
  formData.delete('topics');

  const validFields = [
    'calendly',
    'description',
    'github',
    'linkedin',
    'name',
    'status',
    'twitter',
    'web',
  ];

  const oldMentorData = [...formData]
    .filter(
      (entry) => validFields.includes(entry.at(0) as string) && !entry.at(1),
    )
    .map((entry) => entry.at(0) as string);

  const newMentorData = Object.fromEntries(
    [...formData].filter(
      (entry) =>
        validFields.includes(entry.at(0) as string) &&
        entry[1].length &&
        !!entry[1],
    ),
  );

  try {
    await postClient
      .patch(mentor._id, {
        unset: oldMentorData,
        set: {
          ...newMentorData,
          topics: topicsRefs,
        },
      })
      .commit({
        autoGenerateArrayKeys: true,
      });

    revalidatePath(`/mentorias/${id}/perfil`);
  } catch (error) {
    console.log('Transaction failed: ', error);
  }
}
