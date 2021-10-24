import React, { useEffect, useState } from 'react';
import { Mentor, TimeSlot, Topic } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import TopicBadge from '../TopicBadge';
import CalomentorStep1 from './Step1';
import CalomentorStep2 from './Step2';
import {
  faMapMarkerAlt,
  faClock,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getMentorTimeSlots } from '../../lib/calomentorApi';
import { addMonths } from 'date-fns';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import es from 'date-fns/locale/es';
import { useSession } from 'next-auth/client';
import { useForm } from 'react-hook-form';
registerLocale('es', es);

type ModalProps = {
  isOpen: boolean;
  close: () => void;
  mentor: Mentor;
  topics: Topic[];
  slots: TimeSlot[];
};

type FormInputs = {
  discordID: string;
  discordUser: string;
  email: string;
  name: string;
  info: string;
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
  slots,
}) => {
  const [date, setDate] = useState<Date>();
  const [step, setStep] = useState(1);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [timesAvailables, setTimesAvailables] = useState([]);

  const [session] = useSession();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormInputs>();

  const getTimes = (slots: TimeSlot[], date: Date) => {
    return slots?.reduce((times, slot) => {
      const slotDate = new Date(slot.date);
      console.log(slotDate.toDateString(), date.toDateString());
      if (slotDate.toDateString() === date.toDateString()) {
        times.push(new Date(slot.date));
      }
      return times;
    }, []);
  };

  const getDates = (slots: TimeSlot[]) => {
    return slots?.map((s) => {
      return new Date(s.date);
    });
  };

  useEffect(() => {
    setTimesAvailables(getTimes(slots, startDate));
  }, []);

  const findTopicsName = (id: string) => {
    const topic = topics.find((e) => e._id == id);
    return topic.title;
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleCloseModal = () => {
    close();
  };

  const checkDateAvailable = (st) =>
    st?.filter((s) => s.date.toString() === date?.getTime().toString());

  const onSubmit = (data: FormInputs) => {
    if (checkDateAvailable(slots)?.length === 0) {
      return setError(true);
    }
    console.log(data);
    setLoading(true);
    setUserData(data);
    setTimeout(() => setLoading(false), 1000);
    return reset();
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
                <div className="absolute right-5">
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="w-6 h-6"
                    onClick={handleCloseModal}
                  />
                </div>
                <div className="flex flex-col px-4 sm:flex-row">
                  <div className="flex flex-col flex-1 px-4 my-4 sm:border-r-2 sm:border-gray-300">
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
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className="w-6 h-6"
                          />
                          <span className="pl-2">
                            Discord de FEC - Salas de Mentorías
                          </span>
                        </div>
                        {error ? (
                          <span className="pl-2">
                            Debes seleccionar una fecha y hora que este
                            disponible para le mentoria
                          </span>
                        ) : (
                          date && (
                            <div className="flex items-center py-1">
                              <FontAwesomeIcon
                                icon={faClock}
                                className="w-6 h-6"
                              />
                              <span className="pl-2">
                                {date.toLocaleString()}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 items-center justify-center p-4">
                    <h2>Selecciona una fecha para tu mentoría</h2>
                    <DatePicker
                      selected={startDate}
                      onChange={(date: Date) => {
                        setTimesAvailables(getTimes(slots, date));
                        setDate(date);
                        return setStartDate(date);
                      }}
                      includeDates={getDates(slots)}
                      includeTimes={timesAvailables}
                      locale="es"
                      showTimeSelect
                      className="custom_input"
                      minDate={new Date()}
                      maxDate={addMonths(new Date(), 2)}
                      showDisabledMonthNavigation
                      dateFormat="dd/MM/yyyy HH:mm"
                      timeIntervals={15}
                    />
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-col w-full bg-white rounded"
                    >
                      {console.log(session)}
                      <input
                        type="text"
                        defaultValue={(session && session.user.id) || ''}
                        readOnly
                        hidden
                        {...register('discordID', { required: true })}
                      />
                      <div className="px-5 mb-4">
                        <label className="block mb-2 text-lg font-bold md:text-1xl">
                          Usuario de Discord
                        </label>
                        <div className="relative">
                          <input
                            className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Ingresa tu usuario de Discord"
                            autoComplete="off"
                            defaultValue={(session && session.user.name) || ''}
                            readOnly
                            {...register('discordUser', {
                              required: 'El usuario es requerido',
                            })}
                          />
                        </div>
                      </div>
                      <div className="px-5 mb-4">
                        <label className="block mb-2 text-lg font-bold md:text-1xl">
                          Email
                        </label>
                        <input
                          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline"
                          type="email"
                          placeholder="Ingresa tu email"
                          autoComplete="off"
                          readOnly
                          defaultValue={(session && session.user.email) || ''}
                          {...register('email', { required: true })}
                        />
                        {errors.email && (
                          <p className="pl-1 text-sm text-red-600">
                            Email es requerido
                          </p>
                        )}
                      </div>
                      <div className="px-5 mb-4">
                        <label className="block mb-2 text-lg font-bold md:text-1xl">
                          Nombre*
                        </label>
                        <input
                          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline"
                          type="text"
                          placeholder="Ingresa tu nombre"
                          autoComplete="off"
                          {...register('name', { required: true })}
                        />
                        {errors.name && (
                          <p className="pl-1 text-sm text-red-600">
                            Nombre es requerido
                          </p>
                        )}
                      </div>
                      <div className="px-5 mb-4">
                        <label className="block mb-2 text-lg font-bold md:text-1xl">
                          Contanos*
                        </label>
                        <textarea
                          className="w-full px-3 py-3 text-sm leading-tight text-gray-700 placeholder-gray-700 border border-gray-500 rounded appearance-none focus:outline-none focus:shadow-outline"
                          placeholder="Ingresa tu nombre"
                          autoComplete="off"
                          {...register('info', { required: true })}
                        />
                        {errors.info && (
                          <p className="pl-1 text-sm text-red-600">
                            Nombre es requerido
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-end p-2 rounded-b">
                        <button
                          className="px-6 py-2 text-lg text-white border-0 rounded bg-primary focus:outline-none hover:bg-primarydark"
                          type="submit"
                          style={{ transition: 'all .15s ease' }}
                          disabled={error}
                        >
                          {loading ? (
                            <div className=" flex justify-center items-center px-9 py-1 text-lg text-white border-0 rounded bg-primary">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            </div>
                          ) : (
                            'Confirmar'
                          )}
                        </button>
                      </div>
                    </form>
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
