import clsx from 'clsx';

interface CustomProps {
  label: string;
}
type Props = CustomProps &
  (
    | (React.ComponentProps<'textarea'> & { type: 'textarea' })
    | React.ComponentProps<'input'>
  );

function Input({ label, ...props }: Props) {
  const inputid = props.id || label.replace(/ /gi, '-').toLowerCase();

  let Component;
  if (props.type === 'textarea') {
    Component = 'textarea';
  } else {
    Component = 'input';
  }

  return (
    <div className="relative mt-6 rounded-lg border-b-2 border-white/20 bg-gradient-to-b from-transparent to-black/20 transition-colors focus-within:border-greenFec focus-within:bg-black/20 hover:bg-black/10">
      <Component
        className={clsx(
          'peer w-full rounded-lg bg-transparent p-3 py-2 text-tertiary outline-none placeholder:text-transparent disabled:cursor-not-allowed disabled:text-gray-500',
          props.className,
        )}
        type={props.type}
        placeholder={label}
        id={inputid}
        {...props}
      />
      <label
        className="peer-placeholder-shown:text-secondary-400 pointer-events-none absolute left-3 -top-5 text-sm font-semibold transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-required:after:text-red-500 peer-required:after:content-['_*'] peer-hover:text-greenFec peer-focus:-top-5 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-greenFec"
        htmlFor={inputid}
      >
        {label}
      </label>
    </div>
  );
}

export default Input;
