import { draftMode } from 'next/headers';

const PreviewBanner: React.FC = () => {
  const { isEnabled } = draftMode();
  if (!isEnabled) return null;

  return (
    <div
      style={{ zIndex: 51 }}
      className="bg-green-400 fixed font-semibold w-full text-center text-primary py-2 uppercase"
    >
      Preview mode{' '}
      <a
        href="/api/exit-preview"
        className="absolute block rotate-45 text-4xl leading-none p-0.5 top-0 right-px opacity-60
          hover:opacity-100
          transition-opacity duration-150 ease-in-out"
      >
        +
      </a>
    </div>
  );
};

export default PreviewBanner;
