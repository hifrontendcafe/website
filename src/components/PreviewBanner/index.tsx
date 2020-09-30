import styles from './styles.module.css';

const PreviewBanner: React.FC = () => {
  return (
    <div
      className={`${styles.container} fixed w-full text-center text-white py-2 uppercase`}
    >
      Preview mode <a href="/api/exit-preview" className={styles.exit} />
    </div>
  );
};

export default PreviewBanner;
