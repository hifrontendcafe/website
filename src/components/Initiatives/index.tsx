import InitiativesCarousel from '../InitiativesCarousel';

const InitiativesData = [
  {
    link: '/mentorias',
    emoji: '📘',
    color: 'secondary',
    title: 'Mentorías',
    content:
      'Conectate con profesionales y referentes capacitados en los múltiples y diversos temas que engloba el universo de la tecnología de la información, para guiarte en este desafiante camino, no tiene costo alguno, solo ganas de aprender y muy buena onda.',
    btnText: 'Quiero Participar',
  },
  {
    link: '/cmyk',
    emoji: '🎖',
    color: 'primary',
    title: 'Proyectos CMYK ',
    content:
      'Proyectos colaborativos realizados por miembros de FrontendCafé con el objetivo de ganar experiencia en un entorno profesional.',
    btnText: 'Conocelos aquí',
  },
  {
    link: '/ingles', //falta seccion de ingles
    emoji: '🌏',
    color: 'tertiary',
    title: 'Prácticas de Inglés',
    content:
      'Nos divertimos charlando con el objetivo de perder el miedo a hablar en inglés en Público. Mejorando la comunicación y la confianza. Encuentros online gratuitos. Sin necesidad de Inscripción Sucede desde nuestro canal de Discord.',
    btnText: 'Próximos eventos',
  },
];

const Initiatives: React.FC = () => {
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col justify-center m-auto mt-20 items-center  text-center w-2/3">
        <h1 className="text-5xl font-extrabold mb-5">
          ¡Descubre lo que tenemos para ti!
        </h1>
        <p className="text-lg w-5/6">
          En Frontendcafé con la participación de la comunidad creamos
          diferentes actividades para mejorar nuestras habilidades tanto
          profesionales como comunidad.
        </p>
      </div>
      {<InitiativesCarousel initiatives={InitiativesData} />}
    </div>
  );
};

export default Initiatives;
