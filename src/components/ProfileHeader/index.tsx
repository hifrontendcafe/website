type Props = {
  name: string;
  coverImage: string;
  role: string;
};

const ProfileHeader = ({ name, coverImage, role }: Props) => {
  return (
    <div className="mt-8">
      <img
        src={coverImage}
        className="w-24 h-24 rounded-full mr-4 object-cover"
        alt={name}
      />
      <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight md:leading-none my-4 text-center md:text-left">
        {name}
      </h1>
      <div className="text-4xl font-bold">{role}</div>
    </div>
  );
};

export default ProfileHeader;
