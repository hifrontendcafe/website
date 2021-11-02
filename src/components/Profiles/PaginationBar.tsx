import React, { Dispatch, SetStateAction } from 'react';

import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PaginationBarProps {
  page: number;
  pagesCount: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalProfiles: number;
}

const PaginationBar: React.FC<PaginationBarProps> = ({
  page,
  pagesCount,
  setPage,
  totalProfiles,
}) => {
  return (
    <div className="flex items-center justify-between my-4 text-primary">
      <div className="flex items-center">
        <button
          className="disabled:opacity-50 hover:text-greenFec"
          disabled={page === 1}
          onClick={() => setPage((page) => page - 1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} width="18px" />
        </button>
        <span className="px-2">
          Página {page} de {pagesCount}
        </span>
        <button
          className="disabled:opacity-50 hover:text-greenFec"
          disabled={page === pagesCount}
          onClick={() => setPage((page) => page + 1)}
        >
          <FontAwesomeIcon icon={faArrowRight} width="18px" />
        </button>
      </div>
      <span>
        Total de <span className="font-semibold">{totalProfiles}</span> perfiles
      </span>
    </div>
  );
};

export default PaginationBar;
