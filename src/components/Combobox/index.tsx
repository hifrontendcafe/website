'use client';

import Select, { type GroupBase, type Props } from 'react-select';

function Combobox<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ id, ...props }: Props<Option, IsMulti, Group>) {
  return (
    <Select
      unstyled
      className="relative mt-6 rounded-lg border-b-2 border-white/20 bg-gradient-to-b from-transparent to-black/20 transition-colors focus-within:border-greenFec focus-within:bg-black/20 hover:bg-black/10"
      // TODO: Refactor
      classNames={{
        control: () => `px-2`,
        valueContainer: () => `px-2 gap-y-1 gap-x-3 py-1`,
        multiValue: ({ isFocused }) =>
          `-ml-2 gap-0.5 items-center transition-colors bg-zinc-700 text-sm py-0.5 pl-2 pr-0.5 hover:bg-zinc-800 rounded-full ${
            isFocused && 'ring ring-inset ring-greenFec bg-zinc-800'
          }`,
        multiValueRemove: () => 'p-1 hover:bg-red-900 rounded-full',
        indicatorsContainer: () => `gap-1 place-self-end`,
        input: () => `cursor-text `,
        clearIndicator: () =>
          'cursor-pointer p-1 hover:bg-zinc-800 rounded-full',
        menu: () => `border border-zinc-700 mt-1 bg-zinc-800 rounded-lg`,
        option: ({ isFocused }) =>
          `py-1 px-4 ${isFocused ? 'bg-zinc-700' : ''}`,
        dropdownIndicator: () => `cursor-pointer`,
        placeholder: () => ``,
      }}
      getOptionLabel={(opt: any) => opt.title}
      getOptionValue={(opt: any) => opt._id}
      inputId={id || 'combobox-selector'}
      {...props}
    />
  );
}

export default Combobox;
