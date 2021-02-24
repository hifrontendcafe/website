import markdownStyles from './styles.module.css';

type Props = {
  content: string
}

const ProfileBody = ({ content }: Props) => {
  return (
    <div className="mx-auto">
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

export default ProfileBody
