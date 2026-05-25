import { TabsList, TabsTrigger } from '@/components/ui';
import { steps } from './workflowData';
import type { StepId } from './types';

type WorkflowStepperProps = {
  activeStep: StepId;
  onStepChange: (step: StepId) => void;
};

export default function WorkflowStepper({ activeStep, onStepChange }: WorkflowStepperProps) {
  return (
    <div className="rounded-lg border border-[#DDE4F2] bg-white px-4 py-3 shadow-[0_8px_22px_rgba(31,42,109,0.06)]">
      <TabsList className="!grid w-full gap-2 !rounded-none !border-0 !bg-white !p-0 md:grid-cols-4">
        {steps.map((step) => {
          const isActive = step.id === activeStep;

          return (
            <TabsTrigger
              key={step.id}
              onClick={() => onStepChange(step.id)}
              aria-selected={isActive}
              className={[
                'relative flex !h-12 items-center justify-center gap-2 !rounded-none border-b-2 bg-transparent !px-3 text-center shadow-none transition focus:outline-none focus:ring-4 focus:ring-[#FF6A00]/10 aria-selected:shadow-none',
                isActive ? 'border-[#FF6A00] text-[#1F2A6D]' : 'border-transparent text-[#6B7280] hover:text-[#1F2A6D]',
              ].join(' ')}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="min-w-0 truncate text-l font-bold">{step.title}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </div>
  );
}
