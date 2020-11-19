import Link from 'next/link';
import Layout from '../../components/Layout';
import styles from './styles.module.css';

const Proyect: React.FC = () => {
  return (
    <Layout
      title="Proyectos CMYK"
      description="Workshops, conferencias, afters, entrevistas, english practices para personas interesadas en la tecnología."
    >
      <ul className="min-h-screen flex flex-wrap md:flex-row flex-col items-stretch text-white">
        <li className="flex-1" style={{ background: 'rgb(0, 255, 255)' }}>
          <div className="mx-8 my-16">
            <div className="bg-black text-xl bg-opacity-25 font-bold p-4">
              Burger Quiz
            </div>
            <ul className="bg-white text-black flex">
              <li className="flex-1">
                <a
                  target="_blank"
                  href="https://github.com/JaviCeRodriguez/BurgerQuiz"
                  className="block text-center uppercase p-4 text-sm tracking-wide hover:bg-black hover:bg-opacity-100 hover:text-white"
                >
                  Repo
                </a>
              </li>
              <li className="flex-1">
                <a
                  target="_blank"
                  href="https://burger-quiz.vercel.app/"
                  className="block text-center uppercase p-4 text-sm tracking-wide hover:bg-black hover:bg-opacity-100 hover:text-white"
                >
                  Proyecto
                </a>
              </li>
            </ul>
            <p className="p-4 bg-black bg-opacity-25 mt-10 px-16 py-8">
              Catálogo de hamburguesas qué, como función principal, tiene un
              quiz para encontrar tu hamburguesa ideal.
            </p>
          </div>
        </li>
        <li className="flex-1" style={{ background: 'rgb(255, 0, 255)' }}>
          <div className="mx-8 my-16">
            <div className="bg-black text-xl bg-opacity-25 font-bold p-4">
              Code In Magenta
            </div>
            <ul className="bg-white text-black flex">
              <li className="flex-1">
                <a
                  target="_blank"
                  href="https://github.com/magentateam/landingOng"
                  className="block text-center uppercase p-4 text-sm tracking-wide hover:bg-black hover:bg-opacity-100 hover:text-white"
                >
                  Repo
                </a>
              </li>
              <li className="flex-1">
                <a
                  target="_blank"
                  href="https://magentateam.github.io/landingOng/public/"
                  className="block text-center uppercase p-4 text-sm tracking-wide hover:bg-black hover:bg-opacity-100 hover:text-white"
                >
                  Proyecto
                </a>
              </li>
            </ul>
            <p className="p-4 bg-black bg-opacity-25 mt-10 px-16 py-8">
              Landing page para una organización ficticia que promueve clases,
              eventos y recursos para programadores que tanto estén iniciando
              como para aquellos más experimentados.
            </p>
          </div>
        </li>
        <li className="flex-1" style={{ background: 'rgb(255, 255, 0)' }}>
          <div className="mx-8 my-16">
            <div className="bg-black text-xl bg-opacity-25 font-bold p-4">
              CriptoCalculator
            </div>
            <ul className="bg-white text-black flex">
              <li className="flex-1">
                <a
                  target="_blank"
                  href="https://github.com/panchocorderos/criptocalculator"
                  className="block text-center uppercase p-4 text-sm tracking-wide hover:bg-black hover:bg-opacity-100 hover:text-white"
                >
                  Repo
                </a>
              </li>
              <li className="flex-1">
                <a
                  target="_blank"
                  href="http://criptocalculator-seven.vercel.app/"
                  className="block text-center uppercase p-4 text-sm tracking-wide hover:bg-black hover:bg-opacity-100 hover:text-white"
                >
                  Proyecto
                </a>
              </li>
            </ul>
            <p className="p-4 bg-black bg-opacity-25 mt-10 px-16 py-8">
              Calculadora interactiva de criptomonedas. Converti pesos
              argentinos, chilenos o euros a las principales criptomonedas
              disponibles en el mercado.
            </p>
          </div>
        </li>
        <li className="flex-1" style={{ background: '#000' }}>
          <div className="mx-8 my-16">
            <div className="bg-black text-xl bg-opacity-25 font-bold p-4">
              Pokedéx
            </div>
            <ul className="bg-white text-black flex">
              <li className="flex-1">
                <a
                  target="_blank"
                  href="https://github.com/narvmtz/PokedexFEC"
                  className="block text-center uppercase p-4 text-sm tracking-wide hover:bg-black hover:bg-opacity-100 hover:text-white"
                >
                  Repo
                </a>
              </li>
              <li className="flex-1">
                <a
                  target="_blank"
                  href="https://key.vercel.app/"
                  className="block text-center uppercase p-4 text-sm tracking-wide hover:bg-black hover:bg-opacity-100 hover:text-white"
                >
                  Proyecto
                </a>
              </li>
            </ul>
            <p className="p-4 bg-black bg-opacity-25 mt-10 px-16 py-8">
              Una Pokedéx en la que se puedan visualizar los Pokémon. Para esto
              consumimos la{' '}
              <a href="https://pokeapi.co" target="_blank">
                API pública
              </a>{' '}
              de Pokémon Pokeapi.
            </p>
          </div>
        </li>
      </ul>
    </Layout>
  );
};

export default Proyect;
