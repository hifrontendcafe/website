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
    <div className="flex text-primary items-center justify-between my-4">
      <div>
        <button
          className="btn-secondary rounded-md px-2 py-1 disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage((page) => page - 1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <span className="px-2">
          Página {page} de {pagesCount}
        </span>
        <button
          className="btn-secondary rounded-md px-2 py-1 disabled:opacity-50"
          disabled={page === pagesCount}
          onClick={() => setPage((page) => page + 1)}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <span>
        Total de <span className="font-semibold">{totalProfiles}</span> perfiles
      </span>
    </div>
  );
};

export default PaginationBar;
