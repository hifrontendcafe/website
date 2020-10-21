import styles from './styles.module.css';
import {
  faGithubAlt,
  faLinkedin,
  faTwitch,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gray-800 p-8 pb-6">
      <img
        className={`absolute w-20 ${styles.impostor}`}
        src="/img/impostor.png"
      />
      <div
        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
        style={{ height: '80px', transform: 'translateZ(0)' }}
      >
        <svg
          className="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            className="text-gray-800 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4 text-center md:text-left">
            <h4 className="text-2xl font-semibold text-white">
              Buscanos en nuestras redes
            </h4>
            <div className="flex space-x-1 mt-6 justify-center md:justify-start">
              <Link href="https://twitter.com/FrontEndCafe">
                <a
                  target="_blank"
                  className="grid place-items-center h-10 w-10 rounded-full bg-white text-blue-500 hover:bg-gray-200"
                >
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
              </Link>

              <Link href="http://github.com/frontend-cafe">
                <a
                  target="_blank"
                  className="grid place-items-center h-10 w-10 rounded-full bg-white text-gray-900 hover:bg-gray-200"
                >
                  <FontAwesomeIcon icon={faGithubAlt} size="lg" />
                </a>
              </Link>

              <Link href="https://www.youtube.com/channel/UCUdXQMrVjrMMWG5NOZFpHqQ">
                <a
                  target="_blank"
                  className="grid place-items-center h-10 w-10 rounded-full bg-white text-red-700 hover:bg-gray-200"
                >
                  <FontAwesomeIcon icon={faYoutube} size="lg" />
                </a>
              </Link>

              <Link href="https://www.linkedin.com/company/frontendcafe/">
                <a
                  target="_blank"
                  className="grid place-items-center h-10 w-10 rounded-full bg-white text-blue-700 hover:bg-gray-200"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </a>
              </Link>

              <Link href="https://www.twitch.tv/frontendcafe">
                <a
                  target="_blank"
                  className="grid place-items-center h-10 w-10 rounded-full bg-white text-purple-700 hover:bg-gray-200"
                >
                  <FontAwesomeIcon icon={faTwitch} size="lg" />
                </a>
              </Link>
            </div>
          </div>
          {/*           <div className="w-full lg:w-6/12 px-4 py-5 md:py-0">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="text-gray-200 hover:text-gray-400 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Código de conducta
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
