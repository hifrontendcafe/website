import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Combobox from '@/components/Combobox';
import Input from '@/components/Input';
import SectionHero from '@/components/SectionHero';
import { getMentor } from '@/lib/api.server';
import client from '@/lib/sanity';
import type { Topic } from '@/lib/types';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import groq from 'groq';
import { getServerSession } from 'next-auth/next';
import { notFound } from 'next/navigation';
import PhotoUpload from './PhotoUpload';
import { mentorFormAction } from './mentor-actions';

export const metadata = {
  title: 'Perfil de mentorías',
};

async function Page({ params: { id } }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const isMentor = session?.user.roles.includes('Mentor');
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
    <main>
      <SectionHero title={mentor.name} paragraph="Perfil de mentorías" />

      <section className="relative flex flex-col gap-8 text-white xl:mt-10 xl:flex-row">
        <div className="mx-auto xl:sticky xl:top-16 xl:self-start">
          <PhotoUpload {...mentor} />
        </div>
        <form
          action={handleSubmitAction}
          className="mx-auto mt-10 w-full max-w-prose xl:mt-0"
        >
          <fieldset className="mb-12 space-y-6">
            <legend className="text-lg font-semibold text-greenFec ">
              Información personal
            </legend>
            <div className="flex justify-between gap-x-4">
              <Input
                label="Nombre"
                defaultValue={mentor.name}
                name="name"
                disabled
              />
              <p className="mt-auto mb-2 whitespace-nowrap text-right md:w-full">
                Estado: {mentor.status}
              </p>
            </div>
            <div className="flex">
              <Input
                label="Descripción"
                defaultValue={mentor.description}
                name="description"
                type="textarea"
                rows={6}
              />
            </div>
            <Combobox
              isMulti
              name="topics"
              placeholder="Temas"
              options={allTopics || []}
              defaultValue={mentor.topics}
            />
            <div className="flex">
              <Input
                type="url"
                label="Calendly"
                required
                defaultValue={mentor.calendly}
                name="calendly"
              />
            </div>
          </fieldset>

          <fieldset className="mb-12 space-y-6">
            <legend className="text-lg font-semibold text-greenFec ">
              Redes sociales
            </legend>
            <div className="flex flex-col gap-x-10 gap-y-6 md:flex-row">
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
            </div>
            <div className="flex flex-col gap-x-10 gap-y-6 md:flex-row">
              <Input
                type="url"
                label="GitHub"
                defaultValue={mentor.github}
                name="github"
              />
              <Input
                type="url"
                placeholder="Portafolio"
                label="Website"
                defaultValue={mentor.web}
                name="web"
              />
            </div>
          </fieldset>

          <button className="btn btn-primary ml-auto" type="submit">
            <FontAwesomeIcon icon={faUserEdit} /> Actualizar datos
          </button>
        </form>
      </section>
    </main>
  );
}

export default Page;
