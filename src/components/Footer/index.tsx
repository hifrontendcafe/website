import styles from './styles.module.css';
import {
  faTwitter,
  faGithubAlt,
  faLinkedin,
  faTwitch,
  faYoutube,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => {

   const navItems = [
    { title: 'Unirse a Discord', link: 'https://discord.com/invite/3GC6TJd' },
    { title: 'Proyectos CMYK', link: '/cmyk' },
    { title: 'Mentorías', link: '/mentorias' },
    { title: 'Prácticas de Ingles', link: '/ingles' },
  ];

  return (
    <footer className="relative h-64 bg-black px-24 py-14 text-white text-xl flex justify-between items-center">
      <div className='w-2/4 '>
        <img src='/logo-square.png' className='h-12 w-12 rounded-full'></img>
        <div className='grid grid-cols-2 font-medium	py-5'>
          {navItems.map(({link, title}) => (
            <Link href={link} key={link}>
              <a className="">
                {title}
              </a>
            </Link>
          ))}
        </div>
        <p className='font-light '>© Frontendcafé 2021</p>
      </div>
      <div className='flex flex-col justify-end w-1/4'>
        <p className='w-auto font-medium'>Encuentranos en:</p>
        <div className='flex '>
          <Link href="https://www.youtube.com/channel/UCUdXQMrVjrMMWG5NOZFpHqQ">
            <a
              target="_blank"
              className="grid place-items-center h-10 w-10 rounded-full "
            >
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
          </Link>
          <Link href="https://www.youtube.com/channel/UCUdXQMrVjrMMWG5NOZFpHqQ">
            <a
              target="_blank"
              className="grid place-items-center h-10 w-10 rounded-full "
            >
              <FontAwesomeIcon icon={ faYoutube} size="lg" />
            </a>
          </Link>
          <Link href="https://www.youtube.com/channel/UCUdXQMrVjrMMWG5NOZFpHqQ">
            <a
              target="_blank"
              className="grid place-items-center h-10 w-10 rounded-full "
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
          </Link>
          <Link href="https://www.youtube.com/channel/UCUdXQMrVjrMMWG5NOZFpHqQ">
            <a
              target="_blank"
              className="grid place-items-center h-10 w-10 rounded-full "
            >
              <FontAwesomeIcon icon={faTwitch} size="lg" />
            </a>
          </Link>
          <Link href="https://www.youtube.com/channel/UCUdXQMrVjrMMWG5NOZFpHqQ">
            <a
              target="_blank"
              className="grid place-items-center h-10 w-10 rounded-full "
            >
              <FontAwesomeIcon icon={faGithubAlt} size="lg" />
            </a>
          </Link>
          <Link href="https://www.youtube.com/channel/UCUdXQMrVjrMMWG5NOZFpHqQ">
            <a
              target="_blank"
              className="grid place-items-center h-10 w-10 rounded-full "
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
          </Link>
        </div>
      </div>

      {/* <div className="container mx-auto px-32 py-16 bg-gray-500">

        <div className="flex flex-wrap">
        <div className="w-full lg:w-6/12 px-4 text-center md:text-left">
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
          </div>
      </div>   */}
          </footer>
  );
};

export default Footer;
