import CMYKItemCard from '../../components/CMYKItemCard';
import { GetStaticProps } from 'next';
import { getAllCMYKProjects } from '../../lib/api';
import { CMYK } from '../../lib/types';
import Layout from '../../components/Layout';

import { cmykQuery } from '../../lib/queries';
import { usePreviewSubscription } from '../../lib/sanity';
import { getLayout } from '@/utils/get-layout';
import { useState } from 'react';
import Modal from '@/components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import useTranslation from 'next-translate/useTranslation';

type CMYKProjectsProps = {
  preview?: boolean;
  data: CMYK[];
};

const CMYKProjects: React.FC<CMYKProjectsProps> = ({
  preview = false,
  data,
}) => {
  const { t } = useTranslation('cmyk');
  const { data: projects } = usePreviewSubscription(cmykQuery, {
    initialData: data,
    enabled: preview,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Layout title={t('title')} preview={preview}>
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="text-left lg:pl-28">
            <h2 className="title mt-2 leading-snug tracking-tight">
              {t('title')}&nbsp;
              <img
                src="/icons/hearth.svg"
                width="50px"
                className="inline"
                alt="heart"
              />
            </h2>
            <p className="mt-4 max-w-3xl text-lg">
              {t('description')} <br />
            </p>
            <span
              className="cursor-pointer text-primary flex mt-5"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              {t('more')}&nbsp;
              <FontAwesomeIcon icon={faExternalLinkAlt} width="16px" />
            </span>
          </div>
        </div>
        <div className="w-full h-full mt-12 md:mt-8">
          <div className="max-w-6xl mx-auto p-6 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 justify-items-center gap-6 md:gap-2 relative z-10">
            {projects.map((project, index) => (
              <CMYKItemCard key={project._id} project={project} index={index} />
            ))}
          </div>
          <div className="text-center py-20">
            <h2 className="subtitle mb-8 tracking-tight">
              {t('next')}{' '}
              <img
                src="/icons/hearth.svg"
                className="inline"
                alt="heart"
                width="30px"
              />
            </h2>
            <a
              href="https://discord.gg/frontendcafe"
              className="btn mt-1 btn-secondary py-3 px-6"
            >
              {t('common:join')}
            </a>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        title={t('modal.title')}
        titleClasses="text-primary"
        buttonClasses="text-primary"
      >
        <div className="text-sm overflow-auto px-2 ">
          <ul className="list-none list-inside">
            <li className="mb-1">{t('modal.1')}</li>
            <li className="mb-1">{t('modal.2')}</li>
            <li className="mb-1">{t('modal.3')}</li>
            <li className="mb-1">{t('modal.4')}</li>
            <li>{t('modal.5')}</li>
          </ul>
        </div>
      </Modal>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const data = await getAllCMYKProjects(preview);
  const { dehydratedState } = await getLayout({ preview });

  return { props: { preview, data, dehydratedState }, revalidate: 1 };
};

export default CMYKProjects;
