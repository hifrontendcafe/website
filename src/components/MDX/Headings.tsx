export const Heading1: React.FC = ({ children }) => (
  <h1 className="my-10 text-5xl font-bold text-center lg:my-24 text-primary">
    {children}
  </h1>
);

export const Heading2: React.FC = ({ children }) => (
  <h2 className="mt-10 mb-4 text-2xl font-medium text-primary">{children}</h2>
);

export const Heading3: React.FC = ({ children }) => (
  <h3 className="mt-10 mb-4 text-lg font-medium text-primary">{children}</h3>
);
