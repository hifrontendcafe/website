import { getMetadata } from '@/lib/seo';

export const generateMetadata = () => getMetadata({ title: 'FAQS' });

export default function FaqsPage() {
  return (
    <section className="px-5 py-24">
      <h1 className="mb-20 text-center text-2xl font-medium sm:text-3xl">
        Preguntas frecuentes
      </h1>
      <div className="-mx-2 flex flex-wrap sm:mx-auto sm:mb-2 lg:w-4/5">
        <div className="w-full px-4 py-2 lg:w-1/2">
          <details className="mb-4">
            <summary className="cursor-pointer px-4 py-2 font-semibold hover:text-primary">
              ¿Qué es FrontendCafé?
            </summary>
            <p className="p-4">
              Somos una comunidad de personas interesadas en tecnología y
              ciencias informáticas en donde charlamos sobre lenguajes de
              programación, diseño web, infraestructura, compartimos dudas,
              preguntamos y respondemos.
            </p>
          </details>
          <details className="mb-4">
            <summary className="cursor-pointer px-4 py-2 font-semibold hover:text-primary">
              ¿Qué es el coworking?
            </summary>
            <p className="p-4">
              Durante el momento que estés trabajando puedes entrar a este canal
              y compartir un ambiente de música y chat con usuarios del server.
              En este canal están deshabilitados los micrófonos por defecto para
              poder trabajar sin interrupciones.
            </p>
          </details>
          <details className="mb-4">
            <summary className="cursor-pointer px-4 py-2 font-semibold hover:text-primary">
              ¿Qué es el pair-programming / programar a la par?
            </summary>
            <p className="p-4">
              Similar al coworking, usamos pair-programming cuando queremos
              trabajar pero compartiendo palabras con otros colegas, incluso,
              poder trabajar sobre el mismo proyecto con otros usuarios del
              servidor.
            </p>
          </details>
          <details className="mb-4">
            <summary className="cursor-pointer px-4 py-2 font-semibold hover:text-primary">
              ¿Cómo son los eventos de inglés?
            </summary>
            <p className="p-4">
              Nos reunimos a charlar con el objetivo de perder el miedo a hablar
              en inglés en público, mejorar la comunicación en inglés partiendo
              desde el propio nivel, divertirnos, y conectarnos. Puedes mirar
              cuando serán los próximos eventos en nuestra{' '}
              <a
                href="https://frontend.cafe/eventos"
                className="text-informational"
              >
                agenda
              </a>
              .
            </p>
          </details>
        </div>
        <div className="w-full px-4 py-2 lg:w-1/2">
          <details className="mb-4">
            <summary className="cursor-pointer px-4 py-2 font-semibold hover:text-primary">
              ¿Cuándo son los eventos de inglés?
            </summary>
            <p className="p-4">
              Los eventos de inglés son los días jueves a las 18 hs Colombia y
              Perú (GMT-5), 19 hs Venezuela (GMT-4) y 20 hs Argentina (GTM-3)
            </p>
          </details>
          <details className="mb-4">
            <summary className="cursor-pointer px-4 py-2 font-semibold hover:text-primary">
              ¿Qué nivel hay que tener para participar en los eventos de inglés?
            </summary>
            <p className="p-4">
              No es necesario ningún nivel. Solo tener ganas de participar. Es
              muy importante que puedas activar el micrófono y te animes a
              hablar.
            </p>
          </details>
          <details className="mb-4">
            <summary className="cursor-pointer px-4 py-2 font-semibold hover:text-primary">
              ¿Qué son las mentorías?
            </summary>
            <p className="p-4">
              El programa de mentorías de FrontendCafé busca servirte de guía en
              este camino de la tecnología, conectándote con profesionales y
              referentes capacitados en los múltiples y diversos temas que
              engloba el universo de las tecnologías de la información.
            </p>
          </details>
          <details className="mb-4">
            <summary className="cursor-pointer px-4 py-2 font-semibold hover:text-primary">
              ¿Cómo me anoto a la mentorías?
            </summary>
            <p className="p-4">
              Puedes hacerlo directamente en{' '}
              <a
                href="https://frontend.cafe/mentorias"
                className="text-informational"
              >
                la página de mentorías
              </a>
              , ahí coordinarás fecha y hora según los calendarios de los
              mentores disponibles.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
