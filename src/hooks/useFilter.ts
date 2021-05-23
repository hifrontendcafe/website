import { useState } from 'react';
import { orderBy, uniq } from 'lodash';

interface IFilter {
  ordered: unknown;
  setFilter: void;
}

export const useFilter = (data: unknown[], parameters = ['']): IFilter[] => {
  const [searchFilter, setFilter] = useState('');
  const filterValue = searchFilter.toLowerCase();

  let filtered = [];
  let filteredByParameter = [];

  if (data && parameters && searchFilter) {
    parameters.forEach((parameter) => {
      filteredByParameter = data.filter((value: { [x: string]: string }) =>
        value[parameter]?.toLowerCase()?.includes(filterValue),
      );
      filtered = [...filtered, ...filteredByParameter];
    });
  } else {
    filtered = data;
  }

  const noRepeated = uniq(filtered);
  const ordered = orderBy(noRepeated, parameters);

  return [ordered, setFilter];
};
