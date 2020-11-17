import Hero from '../../components/Hero';
import Layout from '../../components/Layout';
import style from './styles.module.css';

const Proyect: React.FC = () => {
  return (
    <Layout
      title="Proyectos CMYK"
      description="Workshops, conferencias, afters, entrevistas, english practices para personas interesadas en la tecnología."
    >
      <Hero small title="Proyectos CMYK" />
      <div className={`${style.background} min-h-screen`}>
        <div className="container mx-auto pt-24">
          <iframe
            className="shadow-lg rounded-lg"
            src="https://player.twitch.tv/?channel=frontendcafe&parent=frontend.cafe"
            frameBorder="0"
            allowFullScreen={true}
            scrolling="no"
            height="720"
            width="100%"
          ></iframe>
        </div>
      </div>
    </Layout>
  );
};

export default Proyect;
