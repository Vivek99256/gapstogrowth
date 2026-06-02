import { Button, Input, RequiredIndicator, Textarea } from '@/components/ui';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Field, FieldGroup } from './types';
import { FormActions as SharedFormActions, FormField as SharedFormField, FormSection } from '@/components/forms';
import { useId } from 'react';

export function RequiredMark() {
  return <RequiredIndicator />;
}

function FormField({ field }: { field: Field }) {
  const fieldId = useId();
  const spanClass =
    field.span === 'full'
      ? 'lg:col-span-3'
      : field.span === 'two'
        ? 'lg:col-span-2'
        : field.type === 'textarea'
          ? 'lg:col-span-3'
          : '';

  return (
    <SharedFormField className={spanClass} label={field.label} htmlFor={fieldId} required={field.required} helpText={field.helper}>
      <span className="block">
        {field.type === 'select' ? (
        <Select defaultValue={field.value}>
          <SelectTrigger id={fieldId} className="h-12 rounded-lg px-4 text-xs font-semibold">
            <SelectValue placeholder={field.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {(field.options || [field.value]).map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        ) : field.type === 'textarea' ? (
          <Textarea id={fieldId} defaultValue={field.value} placeholder={field.placeholder} />
        ) : (
          <Input id={fieldId} defaultValue={field.value} placeholder={field.placeholder} prefix={field.prefix} />
        )}
      </span>
    </SharedFormField>
  );
}

export function FieldSection({ group }: { group: FieldGroup }) {
  const Icon = group.icon;

  return (
    <FormSection
      title={(
        <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-secondary text-secondary-foreground">
          <Icon className="h-4 w-4" />
        </span>
          <span>{group.title}</span>
        </div>
      )}
    >
      <div className="grid gap-x-6 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
        {group.fields.map((field) => (
          <FormField key={`${group.title}-${field.label}`} field={field} />
        ))}
      </div>
    </FormSection>
  );
}

export function FieldGroupForm({ groups }: { groups: FieldGroup[] }) {
  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <FieldSection key={group.title} group={group} />
      ))}
    </div>
  );
}

export function FormActions({
  submitLabel = 'Submit',
  draftLabel = 'Save as Draft',
}: {
  submitLabel?: string;
  draftLabel?: string;
}) {
  return (
    <SharedFormActions className="mt-6">
      <Button type="button" variant="secondary" className="border-[#FFB176] bg-[#FFF3EA] text-[#C45B00] hover:bg-[#FFE8D4]">
        {draftLabel}
      </Button>
      <Button type="submit" className="px-6">
        {submitLabel}
      </Button>
    </SharedFormActions>
  );
}
