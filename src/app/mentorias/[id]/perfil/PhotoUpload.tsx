'use client';

import { imgUrlFrom } from '@/lib/sanity';
import type { Mentor } from '@/lib/types';
import Image from 'next/image';
import { useState, useTransition } from 'react';
import FileResizer from 'react-image-file-resizer';
import { photoUploadAction } from './mentor-actions';

const resizeFile = (newFile: File) =>
  new Promise((resolve) => {
    FileResizer.imageFileResizer(
      newFile,
      256,
      256,
      'WEBP',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'file',
    );
  });

interface Props {
  photo: Mentor['photo'];
  name: string;
  _id: string;
}

function PhotoUpload({ photo, name, _id }: Props) {
  const [photoRef, setPhotoRef] = useState<Mentor['photo'] | undefined>(photo);
  const [isPending, startTransition] = useTransition();
  const currentPhoto = imgUrlFrom(photoRef, { size: 256 }) || '/img/user.svg';

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || files.length <= 0) return;
    const file = files[0];

    startTransition(async () => {
      try {
        const image = (await resizeFile(file)) as File;
        const formData = new FormData();
        formData.set('photo', image);

        const document = await photoUploadAction(_id, formData, photoRef);

        setPhotoRef(document?.photo);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <fieldset
      disabled={isPending}
      className="disabled:opacity-25 transition-opacity disabled:animate-pulse"
    >
      <label
        htmlFor="photo"
        className="relative after:absolute after:inset-0 after:content-[''] after:rounded-full after:hover:bg-black/25 after:transition-colors"
      >
        <Image
          className={`rounded-full h-64 w-64 object-cover shadow-lg`}
          src={currentPhoto}
          width={256}
          height={256}
          alt={`Avatar de ${name}`}
        />

        <input
          disabled
          onChange={handleSubmit}
          hidden
          type="file"
          name="photo"
          id="photo"
          accept="image/*"
        />
      </label>
    </fieldset>
  );
}

export default PhotoUpload;
