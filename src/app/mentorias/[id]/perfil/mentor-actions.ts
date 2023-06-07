'use server';

import { postClient } from '@/lib/sanity';

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
