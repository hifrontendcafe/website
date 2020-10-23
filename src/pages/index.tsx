import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import Hero from '../components/Hero';
import MediaFeed from '../components/MediaFeed';

const Index = () => {
  const [counter, setCounter] = useState(0);

  const greets = [
    'Welcome to',
    'Somos',
    'Creamos en',
    'Aprendemos en',
    'Compartimos en',
    'Ayudamos en',
    'Nos reímos en',
    'Learn English in',
    'Nuevos amigos en',
    'Incluímos en',
  ];

  if (counter >= greets.length) {
    setCounter(0);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((counter) => counter + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout
      title="Home"
      description="Somos una comunidad de personas interesadas en tecnología y ciencias
    informáticas en donde charlamos sobre lenguajes de programación,
    diseño web, infraestructura, compartimos dudas, preguntamos y
    respondemos."
    >
      <Hero title={greets[counter]} subtitle="Community. Learning. Together." />
      <div
        className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
        style={{ height: '70px', transform: 'translateZ(0)' }}
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
            className="text-indigo-100 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
      <Services />
      <Featured />
      <MediaFeed />
    </Layout>
  );
};

// Page Sections

const Services = () => (
  <section className="pb-20 bg-indigo-100 -mt-24">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap">
        <Link href="#comunidad">
          <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center transition duration-500 ease-in-out transform hover:-translate-y-6 hover:scale-105 cursor-pointer">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
              <div className="flex items-center flex-col px-4 py-5 flex-auto">
                <img className="w-48 mb-4" src="/img/community.svg" />
                <h6 className="text-2xl font-semibold">Comunidad</h6>
                {/*               <p className="mt-2 mb-4 text-gray-600">
                Coworking, after office, charlas, preguntas, respuestas...
              </p> */}
              </div>
            </div>
          </div>
        </Link>
        <Link href="/mentorias">
          <div className="w-full md:w-4/12 px-4 text-center transition duration-500 ease-in-out transform hover:-translate-y-6 hover:scale-105 cursor-pointer">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
              <div className="flex items-center flex-col px-4 py-5 flex-auto">
                <img className="w-48 mb-4" src="/img/mentorships.svg" />
                <h6 className="text-2xl font-semibold">Mentorías</h6>
                {/*               <p className="mt-2 mb-4 text-gray-600">
                Mentorías individuales gratuitas
              </p> */}
              </div>
            </div>
          </div>
        </Link>
        <Link href="#ingles">
          <div className="pt-6 w-full md:w-4/12 px-4 text-center transition duration-500 ease-in-out transform hover:-translate-y-6 hover:scale-105 cursor-pointer">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
              <div className="flex items-center flex-col px-4 py-5 flex-auto">
                <img className="w-48 mb-4" src="/img/english-practices.svg" />
                <h6 className="text-2xl font-semibold">Prácticas de inglés</h6>
                {/*               <p className="mt-2 mb-4 text-gray-600"></p> */}
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex flex-wrap items-center mt-24 mb-12">
        <div className="w-full md:w-5/12 px-4 mr-auto ml-auto mb-16">
          <h3 className="text-2xl md:text-3xl mb-2 font-semibold leading-normal text-gray-800">
            ¿Qué es FrontEndCafé?
          </h3>
          <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
            Somos una comunidad de personas interesadas en tecnología y ciencias
            informáticas en donde charlamos sobre lenguajes de programación,
            diseño web, infraestructura, compartimos dudas, preguntamos y
            respondemos.
          </p>
          <p className="text-lg font-light leading-relaxed mt-0 mb-12  text-gray-700">
            Todo pasa adentro de un canal de Discord...
          </p>
          <a
            href="/docs/manual-de-uso-de-fec"
            className="btn btn-secondary"
            style={{ transition: 'all .15s ease' }}
          >
            Manual de uso de FEC
          </a>
        </div>

        <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
          <iframe
            className="w-full md:max-w-sm lg:min-w-0 sm:min-w-full"
            src="https://discordapp.com/widget?id=594363964499165194&theme=dark"
            height="450"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
);

const Featured = () => {
  return (
    <section id="ingles" className="relative py-48 bg-purple-900">
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
            className="text-purple-900 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="items-center flex flex-wrap">
          <div className="w-full md:w-6/12 ml-auto mr-auto px-4">
            <Image
              alt="..."
              className="max-w-full rounded-lg shadow-md mb-10"
              src="/img/english.png"
              lazy={true}
              unsized
            />
          </div>
          <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
            <div className="md:pr-12">
              <h3 className="text-3xl md:text-4xl font-extrabold text-white">
                Prácticas de inglés
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-gray-200">
                Nos reunimos a charlar con el objetivo de perder el miedo a
                hablar en inglés en público, mejorar la comunicación en inglés
                partiendo desde el propio nivel, divertirnos, y conectarnos.
                Podes mirar cuando serán los próximos eventos en nuestra agenda
              </p>
              <ul className="mt-6 text-white">
                <li>• Son encuentros online gratis</li>
                <li>• No necesitas inscribirte</li>
                <li>• Sucede dentro nuestro canal de Discord</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* const Finisher = () => (
  <section className="pb-20 relative block bg-gray-900">
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
          className="text-gray-900 fill-current"
          points="2560 0 2560 100 0 100"
        ></polygon>
      </svg>
    </div>

    <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
      <div className="flex flex-wrap text-center justify-center">
        <div className="w-full lg:w-6/12 px-4">
          <h2 className="text-4xl font-semibold text-white">Build something</h2>
          <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
            Put the potentially record low maximum sea ice extent tihs year down
            to low ice. According to the National Oceanic and Atmospheric
            Administration, Ted, Scambos.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap mt-12 justify-center">
        <div className="w-full lg:w-3/12 px-4 text-center">
          <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
            <i className="fas fa-medal text-xl"></i>
          </div>
          <h6 className="text-xl mt-5 font-semibold text-white">
            Excelent Services
          </h6>
          <p className="mt-2 mb-4 text-gray-500">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
        <div className="w-full lg:w-3/12 px-4 text-center">
          <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
            <i className="fas fa-poll text-xl"></i>
          </div>
          <h5 className="text-xl mt-5 font-semibold text-white">
            Grow your market
          </h5>
          <p className="mt-2 mb-4 text-gray-500">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
        <div className="w-full lg:w-3/12 px-4 text-center">
          <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
            <i className="fas fa-lightbulb text-xl"></i>
          </div>
          <h5 className="text-xl mt-5 font-semibold text-white">Launch time</h5>
          <p className="mt-2 mb-4 text-gray-500">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    </div>
  </section>
); */

/* const Contact = () => (
  <section className="relative block py-24 lg:pt-0 bg-gray-900">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300">
            <div className="flex-auto p-5 lg:p-10">
              <h4 className="text-2xl font-semibold">Want to work with us?</h4>
              <p className="leading-relaxed mt-1 mb-4 text-gray-600">
                Complete this form and we will get back to you in 24 hours.
              </p>
              <div className="relative w-full mb-3 mt-8">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="full-name"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                  placeholder="Full Name"
                  style={{ transition: 'all .15s ease' }}
                />
              </div>

              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                  placeholder="Email"
                  style={{ transition: 'all .15s ease' }}
                />
              </div>

              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  rows={4}
                  cols={80}
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                  placeholder="Type a message..."
                />
              </div>
              <div className="text-center mt-6">
                <button
                  className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  style={{ transition: 'all .15s ease' }}
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
); */

export default Index;
