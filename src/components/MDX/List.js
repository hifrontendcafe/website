import styles from './styles.module.css';

export const List = ({ children }) => (
  <ul className={styles.list}>{children}</ul>
);
