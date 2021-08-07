import styles from './styles.module.css';

export const ListItem = ({ children }) => (
  <li className={styles.listItem}>
    <div>{children}</div>
  </li>
);
