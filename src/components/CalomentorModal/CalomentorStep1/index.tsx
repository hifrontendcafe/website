import React, { SetStateAction } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

type DateProps = {
  selectedDate: Date;
};

type ModalProps = {
  dates: DayPicker.DateUtils;
  setDate: React.Dispatch<SetStateAction<DateProps>>;
};

const CalomentorStep1: React.FC<ModalProps> = ({ dates, setDate }) => {
  const handleDayClick = (day, modifiers: DayPicker.DayModifiers) => {
    if (modifiers.disabled) {
      console.log('disabled');
      return;
    }
    setDate({ selectedDate: day });
    console.log(day);
  };
  const MONTHS = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const WEEKDAYS_SHORT = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];

  const modifiersStyles = {
    today: {
      color: 'white',
      backgroundColor: '#00C39D',
    },
    day: {
      color: 'yellow',
      backgroundColor: 'black',
    },
  };

  const disabledDays = [
    {
      before: new Date(),
    },
  ];

  return (
    <DayPicker
      initialMonth={new Date(2021, 0)}
      disabledDays={[
        new Date(2021, 0, 12),
        new Date(2021, 0, 2),
        {
          after: new Date(2021, 0, 20),
          before: new Date(2021, 0, 25),
        },
      ]}
    />
  );
};

export default CalomentorStep1;
