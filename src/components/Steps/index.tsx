import type { Step } from '@/lib/types';

type StepsProps = {
  steps: Step[];
};

const Steps: React.FC<StepsProps> = ({ steps }) => {
  return (
    <section className="space-y-16 py-32">
      <ol className="grid gap-5 md:grid-cols-3">
        {steps
          .sort((a, b) => a.step - b.step)
          .map((step) => (
            <li key={step._key} className="grid grid-rows-[1fr,_2fr] gap-2">
              <div className=" flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-greenFec p-3 font-title text-2xl font-semibold text-zinc-900">
                  {step.step}
                </div>
                <h3 className="text-2xl font-medium">{step.title}</h3>
              </div>
              <p className="text-lg text-tertiary md:text-xl">
                {step.description}
              </p>
            </li>
          ))}
      </ol>
    </section>
  );
};

export default Steps;
