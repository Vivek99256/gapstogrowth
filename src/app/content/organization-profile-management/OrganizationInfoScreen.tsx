'use client';

import { ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { PageHeader } from '@/components/ui';
import { ContentContainer } from '@/components/layout/content-container';
import { RequiredMark } from './_components/FormControls';

import WorkflowStepper from './_components/WorkflowStepper';
import ComplianceSetupTab from './_components/tabs/ComplianceSetupTab';
import DepartmentManagementTab from './_components/tabs/DepartmentManagementTab';
import DisciplinarySetupTab from './_components/tabs/DisciplinarySetupTab';
import OrganizationInfoTab from './_components/tabs/OrganizationInfoTab';
import type { StepId } from './_components/types';
import { steps } from './_components/workflowData';

const shellStyle = {
  boxShadow: '0 24px 70px rgba(31, 42, 109, 0.11)',
} as const;

const cardStyle = {
  boxShadow: '0 18px 48px rgba(31, 42, 109, 0.09)',
} as const;

export default function OrganizationInfoScreen() {
  const [activeStep, setActiveStep] = useState<StepId>('organization');
  const activeIndex = steps.findIndex((step) => step.id === activeStep);
  const activeStepMeta = steps[activeIndex] || steps[0];
  const nextStep = steps[activeIndex + 1];
  const previousStep = steps[activeIndex - 1];

  const activeContent = useMemo(() => {
    if (activeStep === 'departments') return <DepartmentManagementTab />;
    if (activeStep === 'compliance') return <ComplianceSetupTab />;
    if (activeStep === 'disciplinary') return <DisciplinarySetupTab />;
    return <OrganizationInfoTab />;
  }, [activeStep]);

  return (
    <ContentContainer>
      <PageHeader
        breadcrumbs={['Organization Management', 'Organization Details']}
        title="Add Organization Details"
        description="Enter the organization's basic information and administrative details."
      />

      <section className="rounded-3xl border border-white/70 bg-white/[0.92] p-4 backdrop-blur-xl sm:p-5 lg:p-6" style={shellStyle}>
        <WorkflowStepper activeStep={activeStep} onStepChange={setActiveStep} />

        <div className="mt-6 ">
          <div
            className={[
              'rounded-2xl border border-[#E4E9F6] bg-white p-5 sm:p-6',
              activeStep === 'departments' ? 'xl:col-span-2' : '',
            ].join(' ')}
            style={cardStyle}
          >
            <div className="mb-6 flex flex-col gap-3 border-b border-[#EEF1F7] pb-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="mt-1 text-xl font-black text-[#111827]">{activeStepMeta.title}</h2>
              </div>
              <p className="text-sm font-semibold text-[#6B7280]">
                <RequiredMark /> Required fields
              </p>
            </div>

            {activeContent}
          </div>
        </div>
      </section>

    </ContentContainer>
  );
}
