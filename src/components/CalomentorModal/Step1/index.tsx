import { TimeSlot } from '@/lib/types';
import { addMonths } from 'date-fns';
import React, { SetStateAction, useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import es from 'date-fns/locale/es';
registerLocale('es', es);

type Step1Props = {
  slots: TimeSlot[];
  setDate: React.Dispatch<SetStateAction<Date>>;
};

const CalomentorStep1: React.FC<Step1Props> = ({ slots, setDate }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [timesAvailables, setTimesAvailables] = useState([]);

  const getTimes = (slots: TimeSlot[], date: Date) => {
    return slots.reduce((times, slot) => {
      const slotDate = new Date(slot.date);
      console.log(slotDate.toDateString(), date.toDateString());
      if (slotDate.toDateString() === date.toDateString()) {
        times.push(new Date(slot.date));
      }
      return times;
    }, []);
  };

  const getDates = (slots: TimeSlot[]) => {
    return slots.map((s) => {
      return new Date(s.date);
    });
  };

  useEffect(() => {
    setTimesAvailables(getTimes(slots, startDate));
  }, []);

  return (
    <>
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
    </>
  );
};

export default CalomentorStep1;
