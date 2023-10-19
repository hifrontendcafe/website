'use client';

import { imgUrlFrom } from '@/lib/sanity';
import type { Mentor } from '@/lib/types';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useState, useTransition } from 'react';
import FileResizer from 'react-image-file-resizer';
import { photoUploadAction } from './mentor-actions';

const resizeFile = (newFile: File) =>
  new Promise((resolve) => {
    FileResizer.imageFileResizer(
      newFile,
      1280,
      1280,
      'WEBP',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'file',
    );
  });

type Props = Pick<Mentor, 'photo' | 'name' | '_id'>;

function PhotoUpload({ photo, name, _id }: Props) {
  const [photoRef, setPhotoRef] = useState<Mentor['photo'] | undefined>(photo);
  const [isPending, startTransition] = useTransition();
  const currentPhoto = imgUrlFrom(photoRef, { size: 768 }) || '/img/user.svg';

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
    <fieldset className="group relative" disabled={isPending}>
      <Image
        className={`h-64 w-64 rounded-full object-cover shadow-lg duration-1000 group-disabled:animate-pulse group-disabled:opacity-25 group-disabled:blur-sm`}
        src={currentPhoto}
        width={768}
        height={768}
        alt={`Foto de ${name}`}
      />
      <label className="cursor-pointer after:absolute after:inset-0 after:overflow-hidden after:rounded-full after:transition-colors focus-within:after:bg-black/10 group-hover:after:bg-black/10 group-disabled:cursor-wait">
        <span className="absolute inset-x-0 -bottom-5 mx-auto max-w-fit rounded bg-zinc-700 px-2 py-1 opacity-75 ring-greenFec transition-opacity group-focus-within:opacity-100 group-focus-within:ring-2 group-hover:opacity-100">
          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" /> Actualizar foto
          de perfil
        </span>
        <input
          onChange={handleSubmit}
          className="sr-only"
          type="file"
          name="photo"
          accept="image/*"
        />
      </label>
    </fieldset>
  );
}

export default PhotoUpload;
