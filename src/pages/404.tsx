import Image from 'next/image';
import Layout from '../components/Layout';
import heart from '../../public/corazon-1.png';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-900 flex-nowrap ">
      <div className="absolute w-3/4 transform -translate-x-1/2 -translate-y-1/3 bg-gradient-to-b from-ellipseBlue via-ellipseBlue to-transparent left-1/2 h-3/5 ellipse filter blur-3xl opacity-70"></div>
      <Image
        src={heart}
        height={164}
        width={164}
        className="text-center"
        alt="Logo FrontendCafe"
      />
      <h1 className="my-3 text-gray-50 subtitle">404 - Page Not Found</h1>
    </div>
  );
}
