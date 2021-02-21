import styles from './styles.module.css';

import { Initiatives } from '../../lib/types';

type InitiativesItemProps = {
  initiative: Initiatives;
};

const InitiativeCard: React.FC<InitiativesItemProps> = ({ initiative }) => {
  return (
    <div
      className={`${styles.card} shadow-2xl m-10 px-5 py-10 flex justify-between`}
    >
      <div className="relative">
        <div
          className={`bg-${initiative.color} rounded-sm w-2 h-24 absolute mt-2 mr-4`}
        ></div>
        <div className="px-5">
          <div className="flex items-center">
            <span role="img" aria-label="mentorias" className="text-3xl">
              {initiative.emoji}
            </span>

            <h1 className="text-4xl pl-2 font-extrabold">{initiative.title}</h1>
          </div>
          <p className="pt-5 pb-8 text-lg">{initiative.content}</p>
          <button className="w-60 h-14">
            <a
              className={`btn-${initiative.color} btn normal-case text-xl font-normal`}
            >
              {initiative.btnText}
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InitiativeCard;
