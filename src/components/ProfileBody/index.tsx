type Props = {
  content: string;
};

const ProfileBody = ({ content }: Props) => {
  return (
    <div className="mx-auto">
      <article
        className="prose prose-xl"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default ProfileBody;
