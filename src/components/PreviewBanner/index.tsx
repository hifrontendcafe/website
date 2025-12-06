const PreviewBanner: React.FC<{ draftMode: boolean }> = ({ draftMode }) => {
  if (!draftMode) return null;

  return (
    <div
      style={{ zIndex: 51 }}
      className="fixed w-full bg-green-400 py-2 text-center font-semibold uppercase text-primary"
    >
      Preview mode{' '}
      <a
        href="/api/exit-preview"
        className="absolute right-px top-0 block rotate-45 p-0.5 text-4xl leading-none opacity-60
          transition-opacity
          duration-150 ease-in-out hover:opacity-100"
      >
        +
      </a>
    </div>
  );
};

export default PreviewBanner;
