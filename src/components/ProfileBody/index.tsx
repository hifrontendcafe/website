import styles from './styles.module.css';

type Props = {
  content: string
}

const ProfileBody = ({ content }: Props) => {
  return (
    <div className="mx-auto">
      <div
        className={styles['profile-content']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

export default ProfileBody
