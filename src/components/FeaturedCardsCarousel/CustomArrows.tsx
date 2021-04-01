import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

const CustomLeftArrow = ({ onClick }) => (
  <FontAwesomeIcon
    className="cursor-pointer text-primary"
    size="2x"
    icon={faArrowLeft}
    onClick={() => onClick()}
  />
);

const CustomRightArrow = ({ onClick }) => (
  <FontAwesomeIcon
    className="cursor-pointer text-primary"
    size="2x"
    icon={faArrowRight}
    onClick={() => onClick()}
  />
);

interface CustomButtonProps {
  next?: () => void;
  previous?: () => void;
}

const CustomButtonGroup: FC<CustomButtonProps> = ({ next, previous }) => {
  return (
    <div className="hidden md:flex container mx-auto gap-5 justify-end pr-16">
      <CustomLeftArrow onClick={previous} />
      <CustomRightArrow onClick={next} />
    </div>
  );
};

export { CustomLeftArrow, CustomRightArrow, CustomButtonGroup };
