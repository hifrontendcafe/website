import styles from './styles.module.css';

export const Link = ({ href, children }) => {
  return (
    <a className={styles.link} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};
