import { useState } from 'react';

export const DiscordUserTooltip: React.FC = () => {
  const [showHelp, setShowHelp] = useState<boolean>(false);
  return (
    <>
      <div
        onMouseOver={() => setShowHelp(true)}
        onMouseLeave={() => setShowHelp(false)}
        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
      >
        <svg
          className="h-5 w-5 text-primary cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div
        className={`absolute bg-gradient-to-r bg-primary text-gray-50 px-4 py-2 rounded flex items-center transition-all duration-150 ${showHelp ? '' : 'hidden'
          }`}
        style={{ right: '0px', bottom: '-50' }}
      >
        <div
          className="bg-primary h-3 w-3 absolute"
          style={{ top: '-6px', right: '16px', transform: 'rotate(45deg)' }}
        />
        <div className="flex flex-col w-64 leading-none p-1 text-sm gap-4">
          <p>
            Para encontrar tu User de Discord solo debes hacer click en tu
            nombre en la aplicacion.
          </p>
          <p>Ejemplo: frontendcafe#5239</p>
          <img className="w-full rounded-lg" src="/img/nickname-help.png" />
        </div>
      </div>
    </>
  );
};
