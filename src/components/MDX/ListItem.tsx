import styles from './styles.module.css';

export const ListItem: React.FC = ({ children }) => (
  <li className={styles.listItem}>
    <div>{children}</div>
  </li>
);
