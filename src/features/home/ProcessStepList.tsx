import type { ProcessStep } from "./homeContent";

interface ProcessStepListProps {
  steps: ProcessStep[];
}

const ProcessStepList = ({ steps }: ProcessStepListProps) => {
  return (
    <section className="mt-10 grid grid-cols-3 gap-4 text-left max-lg:grid-cols-1">
      {steps.map((step, index) => (
        <div
          key={step.title}
          className="rounded-md border border-stone-200 bg-white/70 p-5"
        >
          <p className="text-sm font-bold text-amber-700">0{index + 1}</p>
          <p className="mt-3 text-lg font-black text-stone-950">
            {step.title}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-500">
            {step.description}
          </p>
        </div>
      ))}
    </section>
  );
};

export default ProcessStepList;
