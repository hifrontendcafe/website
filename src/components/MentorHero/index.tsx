import styles from './styles.module.css';

const MentorsHero: React.FC = () => {
  return (
    <>
    <section class="text-gray-700 body-font">
    <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
      <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
        <img class="object-cover object-center rounded" alt="hero" src="public/img/Pair_programming.gif">
      </div>
      <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Programa de mentorías
          <br class="hidden lg:inline-block">de FrontEndCafé
        </h1>
        <p class="mb-8 leading-relaxed">La falta de orientación es una de las cuestiones más nos afecta al comenzar a explorar el mundo de la tecnología y
          queremos ayudarte a que tu camino sea más fácil, conectandote con diferentes profesionales y otros estudiantes dentro del ambito del diseño y 
          desarrollo web, data science e inglés.        
          </p>
        <div class="flex justify-center">
          <button class="inline-flex text-white bg-teal-500 border-0 py-2 px-6 focus:outline-none hover:bg-teal-600 rounded text-lg">Button</button>
          <button class="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">Button</button>
        </div>
      </div>
    </div>
    </section>
    </>
  );
};

export default MentorsHero;
