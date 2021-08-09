import styles from './styles.module.css';

export const Heading = ({ children }) => (
  <h1 className={styles.heading}>{children}</h1>
);
