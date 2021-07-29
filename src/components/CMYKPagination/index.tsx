import React from 'react';

type PaginationProps = {
  projectsPerPage: number;
  totalProjects: number;
  paginate(number): void;
};

export const Pagination: React.FC<PaginationProps> = ({
  projectsPerPage,
  totalProjects,
  paginate,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProjects / projectsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="flex justify-center">
        {pageNumbers.map((number) => (
          <li className="p-2 border mx-1" key={number}>
            <a onClick={() => paginate(number)} href="#">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
