import { Mentor } from "../../lib/types";

interface MentorCardProps {
  mentor: Mentor;
}

const MentorCard: React.FC<MentorCardProps> = ({mentor}) => {
  return (
    <div className="md:p-2 lg:w-1/3 md:w-1/2 w-full">
      <div className="col-span-1 bg-white rounded-lg shadow hover:opacity-75 hover:shadow hover:-mb-3 md:mx-5 my-3">
        <div className="w-full flex items-center justify-between p-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 flex-grow">
              <h3 className="text-gray-900 text-lg leading-5 font-medium">
                {mentor.name}
              </h3>
            </div>
          </div>
          <img
            className="mx-3 w-24 h-24 bg-gray-300 rounded-full flex-shrink-0"
            src={mentor.photo.src}
            alt=""
          />
        </div>
        <div className="border-t border-gray-200">
          <div className="-mt-px flex">
            <div className="w-0 flex-1 flex border-r border-gray-200">
              <a
                href={mentor.calendly}
                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150"
              >
                <span className="ml-3">Calendly</span>
              </a>
            </div>
            <div className="w-0 flex-1 flex border-r border-gray-200">
              <a
                href={mentor.linkedin}
                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150"
              >
                <span className="ml-3">LinkedIn</span>
              </a>
            </div>
            <div className="w-0 flex-1 flex border-r border-gray-200">
              <a
                href={mentor.github}
                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150"
              >
                <span className="ml-3">Github</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
