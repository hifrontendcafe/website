import { Mentor } from "../../lib/types";
import {faGithub, faGithubAlt, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from "next/link";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

interface MentorCardProps {
  mentor: Mentor;
}

const MentorCard: React.FC<MentorCardProps> = ({mentor}) => {
  console.log(mentor)
  return (
    <div className=" lg:w-1/2 w-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 ">
      <div className="col-span-1 bg-white rounded-lg shadow md:mx-3 my-2">
        <div className="w-full flex items-center p-4">
          <div className="">
          <img
              className="mx-6 w-24 h-24 bg-gray-300 rounded-full"
              src={mentor.photo.src}
              alt=""
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-col items  flex-grow">
              <h2 className="text-xl text-green-900 font-medium title-font mb-4">{mentor.name}</h2>
              <span className="leading-relaxed text-sm">Recomendaciones de carrera, revisión de CV y linkedin, como entrar a la industria y conseguir primer trabajo en IT.</span>
              <div className="flex my-3">
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
              <span className="inline-flex rounded mt-4 text-white text-sm space-x-1">
              { mentor.web && <Link href={mentor.web}>
                <a target="_blank" className="bg-pink-800 hover:bg-pink-700 py-1 px-3 rounded">
                  <FontAwesomeIcon icon={faGlobe} />
                </a>
              </Link>}
              { mentor.linkedin && <Link href={mentor.linkedin}>
                <a target="_blank" className="bg-blue-600 hover:bg-blue-700 py-1 px-3 rounded">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </Link>}
              { mentor.github && <Link href={mentor.github}>
                <a target="_blank" className="bg-gray-800 hover:bg-gray-700 py-1 px-3 rounded">
                  <FontAwesomeIcon icon={faGithubAlt} />
                </a>
              </Link>}
              { mentor.calendly && <Link href={mentor.calendly}>
                <a target="_blank" className="bg-teal-500 hover:bg-teal-400 font-bold py-1 px-3 rounded">
                  <span>Programar reunion</span>
                </a>
              </Link>}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
