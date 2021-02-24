type Props = {
  name: string;
  coverImage: string;
  role: string;
};

const ProfileHeader = ({ name, coverImage, role }: Props) => {
  return (
    <div className="pt-8">
      <img
        src={coverImage}
        className="w-24 h-24 rounded-full mr-4 object-cover"
        alt={name}
      />
      <h1 className="mt-4 text-5xl md:text-6xl font-bold tracking-tighter leading-tight md:leading-none">
        {name}
      </h1>
      <h2 className="text-4xl font-bold text-gray-700 tracking-wide">{role}</h2>
    </div>
  );
};

export default ProfileHeader;
