import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Combobox from '@/components/Combobox';
import Input from '@/components/Input';
import SectionHero from '@/components/SectionHero';
import { getMentor } from '@/lib/api.server';
import client from '@/lib/sanity';
import type { Topic } from '@/lib/types';
import groq from 'groq';
import { getServerSession } from 'next-auth/next';
import { notFound } from 'next/navigation';
import PhotoUpload from './PhotoUpload';
import { mentorFormAction } from './mentor-actions';

async function Page({ params: { id } }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const isMentor = session?.user.roles.includes('Ambassador');
  if (!session || !isMentor || session.user.id !== id) {
    return notFound();
  }

  const [mentor, allTopics] = await Promise.all([
    getMentor({ id }),
    client.fetch<Topic[] | null>(
      groq`*[_type == 'topic'] { _id, title, description }`,
    ),
  ]);
  if (!mentor) return notFound();

  const handleSubmitAction = async (formData: FormData) => {
    'use server';

    await mentorFormAction(id, formData);
  };

  return (
    <main className="">
      <SectionHero title={mentor.name} paragraph="Perfil de mentorias" />

      <section className="relative flex flex-col gap-8 text-white xl:mt-10 xl:flex-row">
        <div className="mx-auto xl:sticky xl:top-16 xl:self-start">
          <PhotoUpload {...mentor} />
          <p className="mt-10 text-center">Estado: {mentor.status}</p>
        </div>
        <form
          action={handleSubmitAction}
          className="mx-auto mt-10 w-full max-w-prose space-y-12 xl:mt-0"
        >
          <Input
            label="Nombre"
            defaultValue={mentor.name}
            name="name"
            disabled
          />
          <Input
            label="Descripcion"
            defaultValue={mentor.description}
            name="description"
            type="textarea"
            rows={6}
          />
          <Input
            type="url"
            label="Calendly"
            required
            defaultValue={mentor.calendly}
            name="calendly"
          />
          <Input
            type="url"
            label="LinkedIn"
            defaultValue={mentor.linkedin}
            name="linkedin"
          />
          <Input
            type="url"
            label="Twitter"
            defaultValue={mentor.twitter}
            name="twitter"
          />
          <Input
            type="url"
            label="GitHub"
            defaultValue={mentor.github}
            name="github"
          />
          <Input
            type="url"
            label="Website"
            defaultValue={mentor.web}
            name="web"
          />
          <Combobox
            isMulti
            name="topics"
            placeholder="Temas"
            options={allTopics || []}
            defaultValue={mentor.topics}
          />

          <button className="btn btn-primary" type="submit">
            Actualizar datos
          </button>
        </form>
      </section>
    </main>
  );
}

export default Page;
