import { Tabs, TabsList, TabsTrigger } from '@/components/ui';
import { steps } from './workflowData';
import type { StepId } from './types';

type WorkflowStepperProps = {
  activeStep: StepId;
  onStepChange: (step: StepId) => void;
};

export default function WorkflowStepper({ activeStep, onStepChange }: WorkflowStepperProps) {
  return (
    <Tabs value={activeStep} onValueChange={(value) => onStepChange(value as StepId)}>
      <div className="rounded-lg border border-[#DDE4F2] bg-white px-4 py-3 shadow-[0_8px_22px_rgba(31,42,109,0.06)]">
        <TabsList className="!grid w-full gap-2 !rounded-none !border-0 !bg-white !p-0 md:grid-cols-4">
          {steps.map((step) => (
            <TabsTrigger
              key={step.id}
              value={step.id}
              className="relative flex !h-12 items-center justify-center gap-2 !rounded-none border-b-2 border-transparent bg-transparent !px-3 text-center shadow-none transition data-[state=active]:border-[#FF6A00] data-[state=active]:bg-[#FFF7F0] data-[state=active]:shadow-none focus:outline-none focus:ring-4 focus:ring-[#FF6A00]/10"
            >
              <span className="min-w-0 truncate text-xs font-bold sm:text-sm">{step.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </Tabs>
  );
}
