import { FilterProfileAction } from '@/components/Profiles/filterReducer';
import { ProfileFilters, Role, Seniority, Technology } from '@/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Dispatch } from 'react';
import Select from 'react-select';

interface FormProps {
  filters: ProfileFilters;
  dispatch: Dispatch<FilterProfileAction>;
  technologies: Technology[];
  roles: Role[];
  seniorities: Seniority[];
}

const maxTechnologies = 5;

const isValidNewOption = (inputValue: string[], selectValue: string[]) =>
  inputValue.length > 0 && selectValue.length < maxTechnologies;

const FilterForm: React.FC<FormProps> = ({
  filters,
  dispatch,
  technologies,
  roles,
  seniorities,
}) => {
  const router = useRouter();

  const searchParams = useSearchParams()!;
  const activesQuery = searchParams.get('activos');

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const isRoleSelected = filters.roleId !== '';
  const isSenioritySelected = filters.seniorityId !== '';

  React.useEffect(() => {
    if (activesQuery)
      dispatch({
        type: 'SET_AVAILABLE',
        payload: true,
      });
  }, [activesQuery, dispatch]);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex flex-col justify-around gap-4 text-zinc-100 md:flex-row md:items-center">
        <select
          name="role"
          className={`form-select w-full rounded border border-zinc-500 bg-zinc-900 py-2 text-sm leading-tight ${
            isRoleSelected ? 'text-primary' : 'text-tertiary'
          }`}
          onChange={(event) =>
            dispatch({ type: 'ADD_ROLE', payload: event.target.value })
          }
        >
          {roles.map((role) => (
            <option value={role._id} key={role._id}>
              {role.name}
            </option>
          ))}
          <option value="" key="all">
            Todos
          </option>
          <option value="" key="placeholder" selected disabled hidden>
            Rol
          </option>
        </select>
        <select
          name="seniority"
          className={`form-select w-full rounded border border-zinc-500 bg-zinc-900 py-2 text-sm leading-tight ${
            isSenioritySelected ? 'text-primary' : 'text-tertiary'
          }`}
          onChange={(event) =>
            dispatch({ type: 'ADD_SENIORITY', payload: event.target.value })
          }
        >
          {seniorities.map((seniority) => (
            <option value={seniority._id} key={seniority._id}>
              {seniority.name}
            </option>
          ))}
          <option value="" key="placeholder" selected disabled hidden>
            Seniority
          </option>
          <option value="" key="all">
            Todas
          </option>
        </select>
        <input
          name="location"
          type="text"
          placeholder="Ubicación"
          className="form-input w-full rounded border border-zinc-500 bg-zinc-900 py-2 text-sm leading-tight placeholder-zinc-300"
          onChange={(event) =>
            dispatch({ type: 'ADD_LOCATION', payload: event.target.value })
          }
        />
        <input
          name="description"
          type="text"
          placeholder="Explora las biografías"
          className="form-input w-full rounded border border-zinc-500 bg-zinc-900 py-2 text-sm leading-tight placeholder-zinc-300"
          onChange={(event) =>
            dispatch({ type: 'ADD_DESCRIPTION', payload: event.target.value })
          }
        />
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <Select
          instanceId="technologies-selector"
          isMulti
          classNamePrefix="react-select"
          className="filter-selector bg w-full bg-transparent bg-zinc-900"
          placeholder="Selecciona tecnologías"
          onChange={(techs) =>
            dispatch({ type: 'ADD_TECHNOLOGIES', payload: techs })
          }
          isValidNewOption={isValidNewOption}
          options={
            filters.technologies?.length === maxTechnologies ? [] : technologies
          }
          noOptionsMessage={() => {
            return filters.technologies?.length === maxTechnologies
              ? 'Has alcanzado el máximo de opciones'
              : 'No opciones disponibles';
          }}
        />
        <div className="flex shrink-0 items-center justify-end gap-2">
          <label
            htmlFor="available"
            className="text-sm leading-4 text-secondary"
          >
            En búsqueda activa
          </label>
          <div className="relative w-10 select-none transition duration-200 ease-in">
            <input
              id="available"
              name="available"
              type="checkbox"
              checked={filters.available}
              onChange={(event) => {
                dispatch({
                  type: 'SET_AVAILABLE',
                  payload: event.target.checked,
                });
                activesQuery && router.push('/talentos');
              }}
              className={`border-zinc form-checkbox absolute block h-6 w-6 cursor-pointer rounded-full border-4 outline-none ring-0 transition-transform focus:outline-none focus:ring-0 focus:ring-offset-0 ${
                filters.available
                  ? ' translate-x-4 text-green-400'
                  : 'border-zinc-500'
              }`}
            />
            <label
              htmlFor="available"
              className={`${
                filters.available ? 'bg-white-400' : 'bg-zinc-300'
              } block h-6 cursor-pointer overflow-hidden rounded-full border border-zinc-500 bg-zinc-300`}
            ></label>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FilterForm;
