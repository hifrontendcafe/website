interface AboutProps {
  description?: string;
}

const AboutSection: React.FC<AboutProps> = ({ description }) => (
  <section
    id="about"
    className="flex relative pt-10 flex-wrap pb-5 w-full px-5 items-center mt-24 mb-12  container mx-auto"
  >
    <div className="w-full md:w-6/12 px-4 mr-auto ml-auto mb-16 ">
      <h3 className="title-primary text-4xl text-center md:text-left md:text-4xl lg:text-5xl mb-2 leading-normal font-bold">
        ¿Quiénes somos?
      </h3>
      <p className="text-lg text-center md:text-left leading-relaxed mt-4 mb-4 text-gray-700">
        {description}
      </p>
    </div>

    <div className="md:w-4/12 px-4 mx-auto">
      <iframe
        className="w-full shadow-lg md:max-w-sm lg:min-w-0 sm:min-w-full"
        src="https://discordapp.com/widget?id=594363964499165194&theme=dark"
        height="400"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      />
    </div>
  </section>
);

export default AboutSection;
