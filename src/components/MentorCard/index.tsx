import { MentorCalomentor, TimeSlot, Topic } from '../../lib/types';
import {
  faGithubAlt,
  faLinkedinIn,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import TopicBadge from '../TopicBadge';
import { motion } from 'framer-motion';
import { useState } from 'react';
import CalomentorModal from '../CalomentorModal';
interface MentorCardProps {
  mentor: MentorCalomentor;
  mentorSlots: TimeSlot[];
  topics: Topic[];
  isLogged: boolean;
  openModal: () => void;
}

const MentorCard: React.FC<MentorCardProps> = ({
  mentor,
  mentorSlots,
  topics,
  isLogged,
  openModal,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slots, setSlots] = useState<TimeSlot[]>(mentorSlots);

  const findTopicsName = (id: string) => {
    const topic = topics.find((e) => e.value == id);
    return topic.value;
  };

  const handleContactButton = async () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: mentor.isActive && slots?.length > 0 ? 1 : 0.66,
        }}
        exit={{ y: -100, opacity: 0 }}
        className="flex flex-col w-full p-6 rounded-lg bg-gray-800 space-between"
      >
        <div>
          <div className="flex justify-between w-full">
            <div>
              <img
                className="object-cover w-24 h-24 mr-4 rounded-full bg-gray-300"
                src={
                  mentor.url_photo && mentor.url_photo != ''
                    ? `${mentor.url_photo}`
                    : 'https://res.cloudinary.com/frontendcafe/image/upload/v1631388475/defaultUserImage_advu4k.svg'
                }
                alt={`${mentor.full_name} Avatar`}
              />
            </div>
            <div>
              <div className="mb-4">
                {!mentor.isActive || !slots || slots?.length === 0 ? (
                  <button className="capitalize cursor-not-allowed text-md btn btn-secondary">
                    No Disponible
                  </button>
                ) : mentor.isActive && isLogged ? (
                  <button
                    onClick={() => handleContactButton()}
                    className="capitalize border text-md text-gray-50 border-gray-50 btn hover:text-gray-800 hover:bg-gray-50 hover:border-gray-50"
                  >
                    Solicitar mentoría
                  </button>
                ) : (
                  <button
                    onClick={() => openModal()}
                    className="capitalize border text-md text-gray-50 border-gray-50 btn hover:text-gray-800 hover:bg-gray-50 hover:border-gray-50"
                  >
                    Solicitar mentoría
                  </button>
                )}
              </div>

              <div className="flex mt-2 place-content-end">
                {mentor.links.portfolio && (
                  <Link href={mentor.links.portfolio}>
                    <a
                      target="_blank"
                      className="flex items-center justify-center w-8 h-8 ml-2 rounded-full text-zinc-50 bg-zinc-700"
                    >
                      <FontAwesomeIcon className="w-4 h-4" icon={faGlobe} />
                    </a>
                  </Link>
                )}
                {mentor.links.linkedin && (
                  <Link href={mentor.links.linkedin}>
                    <a
                      target="_blank"
                      className="flex items-center justify-center w-8 h-8 ml-2 rounded-full text-zinc-50 bg-zinc-700"
                    >
                      <FontAwesomeIcon
                        className="w-4 h-4"
                        icon={faLinkedinIn}
                      />
                    </a>
                  </Link>
                )}
                {mentor.links.github && (
                  <Link href={mentor.links.github}>
                    <a
                      target="_blank"
                      className="flex items-center justify-center w-8 h-8 ml-2 rounded-full text-zinc-50 bg-zinc-700"
                    >
                      <FontAwesomeIcon className="w-4 h-4" icon={faGithubAlt} />
                    </a>
                  </Link>
                )}
                {mentor.links.twitter && (
                  <Link href={mentor.links.twitter}>
                    <a
                      target="_blank"
                      className="flex items-center justify-center w-8 h-8 ml-2 rounded-full text-zinc-50 bg-zinc-700"
                    >
                      <FontAwesomeIcon className="w-4 h-4" icon={faTwitter} />
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-2 text-xl font-bold text-gray-50">
            {mentor.full_name}
          </h2>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="flex">
            <div>
              <p className="text-md leading-relaxed text-zinc-300 md:min-h-64">
                {mentor.about_me ? mentor.about_me : '---'}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap mt-4 md:justify-start">
            {mentor.skills &&
              mentor.skills?.map((topic) => (
                <TopicBadge key={topic} topic={findTopicsName(topic)} />
              ))}
          </div>
        </div>
      </motion.div>
      <CalomentorModal
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        mentor={mentor}
        topics={topics}
        slots={slots}
      />
    </>
  );
};

export default MentorCard;
