import type { Step } from '@/lib/types';

type StepsProps = {
  steps: Step[];
};

const Steps: React.FC<StepsProps> = ({ steps }) => {
  return (
    <section className="text-primary body-font">
      <div className="px-5 py-32 lg:px-0">
        <div className="flex flex-wrap -mx-4 -mt-4 -mb-10 sm:-m-4">
          {steps
            .sort((a, b) => (a > b ? -1 : 1))
            .map((step) => (
              <div
                key={step._key}
                className="flex flex-col items-center mb-6 text-center md:p-4 md:w-1/3 md:mb-0 "
              >
                <div className="mb-6 text-left md:mb-0">
                  <div className="flex items-center mb-2 font-title">
                    <div className="flex items-center justify-center w-10 h-10 p-3 mr-2 text-2xl font-semibold rounded-full text-zinc-900 font-title bg-greenFec">
                      {step.step}
                    </div>
                    <h2 className="text-2xl font-medium font-title">
                      {step.title}
                    </h2>
                  </div>
                  <p className="text-lg text-tertiary md:text-xl">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
