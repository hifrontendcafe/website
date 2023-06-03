import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Dispatch, SetStateAction } from 'react';

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
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <button
          className="hover:text-greenFec disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage((page) => page - 1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} width="18px" />
        </button>
        <span className="px-2">
          Página {page} de {pagesCount}
        </span>
        <button
          className="hover:text-greenFec disabled:opacity-50"
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
