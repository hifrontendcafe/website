import { Mentor } from '../../lib/types';
import {
  faGithub,
  faGithubAlt,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

interface MentorCardProps {
  mentor: Mentor;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => {
  return (
    <div className="w-full">
      <div className="col-span-1 bg-white rounded-lg shadow my-2 border border-teal-400">
        <div className="w-full flex items-center flex-col md:flex-row px-6 py-4 text-center md:text-left">
          <div className="flex flex-col items-center mr-6 text-white">
            <img
              className="w-24 h-24 bg-gray-300 rounded-full"
              src={mentor.photo.src}
              alt=""
            />
            <div className="flex mt-2 space-x-1">
              {mentor.web && (
                <Link href={mentor.web}>
                  <a
                    target="_blank"
                    className="grid place-items-center h-8 w-8 rounded-full  bg-pink-800 hover:bg-pink-700"
                  >
                    <FontAwesomeIcon icon={faGlobe} />
                  </a>
                </Link>
              )}
              {mentor.linkedin && (
                <Link href={mentor.linkedin}>
                  <a
                    target="_blank"
                    className="grid place-items-center h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700"
                  >
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </a>
                </Link>
              )}
              {mentor.github && (
                <Link href={mentor.github}>
                  <a
                    target="_blank"
                    className="grid place-items-center h-8 w-8 rounded-full bg-gray-800 hover:bg-gray-700"
                  >
                    <FontAwesomeIcon icon={faGithubAlt} />
                  </a>
                </Link>
              )}
            </div>
          </div>
          <div className="flex-1 border-l pl-6">
            <div className="flex flex-col items  flex-grow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl text-green-900 font-medium title-font">
                  {mentor.name}
                </h2>
                {mentor.calendly && (
                  <Link href={mentor.calendly}>
                    <a
                      target="_blank"
                      className="text-white bg-teal-500 hover:bg-teal-400 font-base text-sm py-1 px-3 rounded"
                    >
                      <span>Programar reunion</span>
                    </a>
                  </Link>
                )}
              </div>

              <span className="leading-relaxed text-xs">
                Recomendaciones de carrera, revisión de CV y linkedin, como
                entrar a la industria y conseguir primer trabajo en IT.
              </span>
              <div className="flex my-3 justify-center md:justify-start">
                <span className="mr-1 p-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-indigo-100 text-indigo-800">
                  Frontend
                </span>
                <span className="mr-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-green-100 text-green-800">
                  Inglés
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-pink-100 text-pink-800">
                  Orientación / CV
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
