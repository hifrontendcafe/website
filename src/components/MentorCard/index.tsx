import { Mentor, MentorCalomentor, TimeSlot, Topic } from '../../lib/types';
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
import { getMentorTimeSlots } from '@/lib/calomentorApi';
interface MentorCardProps {
  mentor: MentorCalomentor;
  topics: Topic[];
  isLogged: boolean;
  openModal: () => void;
}

const MentorCard: React.FC<MentorCardProps> = ({
  mentor,
  topics,
  isLogged,
  openModal,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slots, setSlots] = useState<TimeSlot[] | null>(null);

  const findTopicsName = (id: string) => {
    const topic = topics.find((e) => e.value == id);
    return topic.value;
  };

  const getTimeSlots = async (mentorId: string) => {
    const timeslots: TimeSlot[] = await getMentorTimeSlots(mentorId);
    return setSlots(timeslots);
  };

  const handleContactButton = async () => {
    await getTimeSlots(mentor.id);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: mentor.isActive ? 1 : 0.66 }}
        exit={{ y: -100, opacity: 0 }}
        className="flex flex-col w-full p-4 bg-gray-600 rounded-lg space-between"
      >
        <div className="flex justify-between">
          <div className="flex justify-between w-full">
            <div className="text-gray-50">
              <img
                className="object-cover w-24 h-24 mr-2 bg-gray-300 rounded-full"
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
                {!mentor.isActive ? (
                  <button className="text-xs uppercase cursor-not-allowed btn btn-secondary">
                    No Disponible
                  </button>
                ) : isLogged ? (
                  <button
                    onClick={() => handleContactButton()}
                    className="text-xs uppercase border text-gray-50 border-gray-50 btn hover:text-gray-800 hover:bg-gray-300 hover:border-gray-300"
                  >
                    Solicitar mentoría
                  </button>
                ) : (
                  <button
                    onClick={() => openModal()}
                    className="text-xs uppercase border text-gray-50 border-gray-50 btn hover:text-gray-800 hover:bg-gray-300 hover:border-gray-300"
                  >
                    Solicitar mentoría
                  </button>
                )}
              </div>
              <div className="flex mt-2">
                {mentor.links.portfolio && (
                  <Link href={mentor.links.portfolio}>
                    <a target="_blank" className="w-8 h-8 text-gray-50">
                      <FontAwesomeIcon className="w-4 h-4" icon={faGlobe} />
                    </a>
                  </Link>
                )}
                {mentor.links.linkedin && (
                  <Link href={mentor.links.linkedin}>
                    <a target="_blank" className="w-8 h-8 text-gray-50">
                      <FontAwesomeIcon
                        className="w-4 h-4"
                        icon={faLinkedinIn}
                      />
                    </a>
                  </Link>
                )}
                {mentor.links.github && (
                  <Link href={mentor.links.github}>
                    <a target="_blank" className="w-8 h-8 text-gray-50">
                      <FontAwesomeIcon className="w-4 h-4" icon={faGithubAlt} />
                    </a>
                  </Link>
                )}
                {mentor.links.twitter && (
                  <Link href={mentor.links.twitter}>
                    <a target="_blank" className="w-8 h-8 text-gray-50">
                      <FontAwesomeIcon className="w-4 h-4" icon={faTwitter} />
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="mb-2 text-xl font-bold text-gray-50">
              {mentor.full_name}
            </h2>
          </div>
          <div className="flex">
            <div>
              <p className="text-xs leading-relaxed text-gray-100 md:min-h-64">
                {mentor.about_me ? mentor.about_me : '---'}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap my-3 md:justify-start">
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
