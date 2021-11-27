type ProfileBodyProps = {
  content: string;
};

const ProfileBody: React.FC<ProfileBodyProps> = ({ content }) => {
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
