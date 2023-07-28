import { getMetadata } from '@/lib/seo';

export const generateMetadata = () =>
  getMetadata({
    title: 'Mentorías',
    description:
      'El programa de mentorías de FrontendCafé  busca servirte de guía en este camino, conectándote con profesionales y referentes capacitados en los múltiples y diversos temas que engloba el universo de las tecnologías de la información.',
  });

export default function MentorshipsFeedbackPage() {
  return (
    <div className="pb-24 mt-16 bg-indigo-100 sm:pt-10 md:mt-2">
      <div className="min-h-screen overflow-hidden bg-white rounded-lg shadow">
        <div className="px-12 py-5 text-zinc-700">
          <iframe
            className="min-h-screen"
            src="https://docs.google.com/forms/d/e/1FAIpQLSclO2ve0vhcVe66YXk6prAAEtWt4zVmvNQ-tTnpNsmoCX_Yfw/viewform?embedded=true"
            width="100%"
          >
            Cargando…
          </iframe>
        </div>
      </div>
    </div>
  );
}
