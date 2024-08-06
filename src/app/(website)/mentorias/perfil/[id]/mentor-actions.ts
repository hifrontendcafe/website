'use server';

import { authOptions } from '@/app/(website)/api/auth/[...nextauth]/authOptions';
import { getMentor } from '@/lib/api.server';
import { postClient } from '@/lib/sanity';
import type { Mentor } from '@/lib/types';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function photoUploadAction(
  documentId: string,
  formData: FormData,
  prevPhoto?: Mentor['photo'],
) {
  try {
    const photo = formData.get('photo') as File;
    const photoBuffer = Buffer.from(await photo.arrayBuffer());

    const uploadedAsset = await postClient.assets.upload('image', photoBuffer);
    const document = await postClient
      .patch(documentId, {
        set: {
          photo: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: uploadedAsset._id,
            },
          },
        },
      })
      .commit();
    // TODO: Add Sanity 'image' type
    // @ts-expect-error Wrong photo type (Sanity 'image').
    if (prevPhoto?.asset._ref) postClient.delete(prevPhoto.asset._ref);

    return document;
  } catch (error) {
    console.log(error);
  }
}

export async function mentorFormAction(id: string, formData: FormData) {
  const session = getServerSession(authOptions);
  const mentor = await getMentor({ id });
  if (!session || !mentor) return;

  const topicsRefs = formData
    .getAll('topics')
    .filter((topic) => typeof topic === 'string' && topic.length && !!topic)
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
    .filter(([key, value]) => validFields.includes(key) && !value)
    .map(([key]) => key);

  const newMentorData = Object.fromEntries(
    [...formData].filter(
      ([key, value]) =>
        validFields.includes(key) &&
        typeof value === 'string' &&
        value.length &&
        !!value,
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

    revalidatePath(`/mentorias/perfil/${id}`);
  } catch (error) {
    console.log('Transaction failed: ', error);
  }
}
