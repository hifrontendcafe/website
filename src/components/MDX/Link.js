import styles from './styles.module.css';

export const Link = ({ href, children }) => {
  return (
    <a
      className="my-0 mx-1 font-medium no-underline text-darkBlue transition color duration-100 ease-in hover:text-hover"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};
