function MentorListSkeleton() {
  return (
    <section className="mt-20" aria-hidden>
      <div className="mb-10 flex animate-pulse flex-col justify-between lg:flex-row lg:items-center">
        <h2 className="mb-4 text-2xl font-medium lg:m-0 animate">
          Cargando...
        </h2>
        <label
          aria-label="Buscar"
          className="relative inline-block w-full md:w-1/2 lg:w-1/3"
        >
          <select
            disabled
            className="w-full appearance-none rounded border border-zinc-400 bg-zinc-900 px-4 py-2 pr-8  leading-tight hover:border-zinc-500 focus:outline-none focus:ring"
          ></select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </label>
      </div>
    </section>
  );
}

export default MentorListSkeleton;
