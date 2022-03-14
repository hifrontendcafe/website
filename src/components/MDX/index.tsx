interface LinkProps {
  href: string;
}

export const Heading1: React.FC = ({ children }) => (
  <h1 className="my-10 text-4xl lg:text-5xl font-bold text-center lg:my-24 text-primary">
    {children}
  </h1>
);

export const Heading2: React.FC = ({ children }) => (
  <h2 className="mt-10 mb-4 text-2xl font-medium text-primary">{children}</h2>
);

export const Heading3: React.FC = ({ children }) => (
  <h3 className="mt-10 mb-4 text-lg font-medium text-primary">{children}</h3>
);

export const Link: React.FC<LinkProps> = ({ href, children }) => {
  return (
    <a
      className="mx-1 my-0 font-medium transition duration-100 ease-in text-informational color hover:text-darkBlue hover:underline"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

export const UnorderedList: React.FC = ({ children }) => (
  <ul className="leading-7 list-disc text-secondary pl-9">{children}</ul>
);

export const OrderedList: React.FC = ({ children }) => (
  <ol className="leading-7 list-decimal text-secondary pl-9">{children}</ol>
);

export const ListItem: React.FC = ({ children }) => <li>{children}</li>;

export const Paragraph: React.FC = ({ children }) => (
  <p className="mx-0 my-5 text-lg leading-7 text-secondary lg:text-center">
    {children}
  </p>
);

export const Strong: React.FC = ({ children }) => (
  <strong className="font-semibold">{children}</strong>
);
