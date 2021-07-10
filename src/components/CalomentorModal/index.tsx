import React, { useState } from 'react';
import { Mentor, Topic } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import TopicBadge from '../TopicBadge';
import CalomentorStep1 from './CalomentorStep1';
import CalomentorStep2 from './CalomentorStep2';
import { faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ModalProps = {
  isOpen: boolean;
  close: () => void;
  mentor: Mentor;
  topics: Topic[];
};

const CalomentorModal: React.FC<ModalProps> = ({
  isOpen,
  close,
  mentor: {
    name,
    photo: { src, alt },
    topics: mentorTopics,
  },
  topics,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  const findTopicsName = (id: string) => {
    const topic = topics.find((e) => e._id == id);
    return topic.title;
  };

  const [step, setStep] = useState(1);

  type DateProps = {
    selectedDate: Date;
  };
  const [date, setDate] = useState<DateProps>({
    selectedDate: null,
  });

  const handleCloseModal = () => {
    close();
    setStep(1);
  };

  const handleNextStep = () => {
    step === 1 ? setStep(2) : console.log('Confirmado');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center outline-none lg:p-0 focus:outline-none"
            onClick={handleCloseModal}
            style={{ zIndex: 999 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'tween' }}
              className="relative w-auto max-w-3xl"
              onClick={handleClick}
            >
              {/* content */}
              <div className="max-h-screen py-4 overflow-y-auto bg-white border rounded-lg shadow-xl outline-none focus:outline-none">
                {/*body*/}
                <div className="flex flex-col px-4 sm:flex-row">
                  <div className="flex flex-col px-4 my-4 sm:border-r-2 sm:border-gray-300">
                    <div className="flex items-center">
                      <img
                        src={src}
                        alt={alt}
                        className="w-16 h-16 rounded-full"
                      />
                      <h2 className="pl-3 text-3xl text-green-900">{name}</h2>
                    </div>
                    <div className="py-2">
                      {mentorTopics &&
                        mentorTopics?.map((topic) => (
                          <TopicBadge
                            key={topic._key}
                            topic={findTopicsName(topic._ref)}
                          />
                        ))}
                      <p className="py-2 text-gray-800">
                        Esto es un texto hardcodeado que va a tener que venir de
                        sanity, hay que ponerle una cantidad límite de
                        caracteres para que no quede terrible testamento :)
                      </p>
                      <div className="py-8">
                        <div className="flex items-center py-1">
                          <FontAwesomeIcon icon={faClock} className="w-6 h-6" />
                          <span className="pl-2">30 min</span>
                        </div>
                        <div className="flex items-center py-1">
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className="w-6 h-6"
                          />
                          <span className="pl-2">
                            Discord de FEC - Salas de Mentorías
                          </span>
                        </div>
                        {date.selectedDate && (
                          <span className="pl-2">{date.selectedDate}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4">
                    {step === 1 && (
                      <CalomentorStep1 dates={null} setDate={setDate} />
                    )}
                    {step === 2 && <CalomentorStep2 />}
                    {/*footer*/}
                    <div className="flex items-center justify-end p-2 rounded-b">
                      <button
                        className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase outline-none background-transparent focus:outline-none"
                        type="button"
                        style={{ transition: 'all .15s ease' }}
                        onClick={handleCloseModal}
                      >
                        Cancelar
                      </button>
                      <button
                        className="px-6 py-2 text-lg text-white border-0 rounded bg-primary focus:outline-none hover:bg-primarydark"
                        type="button"
                        style={{ transition: 'all .15s ease' }}
                        onClick={handleNextStep}
                      >
                        {step === 1 ? 'Siguiente' : 'Confirmar'}
                      </button>
                    </div>
                    {/*footer*/}
                  </div>
                </div>
              </div>
              {/* content */}
            </motion.div>
          </div>
          <motion.div
            exit={{ opacity: 0 }}
            style={{ zIndex: 500 }}
            className="fixed inset-0 w-screen h-screen bg-black opacity-30"
          ></motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CalomentorModal;
