interface LinkProps {
  href: string;
}

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
