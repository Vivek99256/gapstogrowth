import { Button, Input, Label, RequiredIndicator, Select, Textarea } from '@/components/ui';
import type { Field, FieldGroup } from './types';

export function RequiredMark() {
  return <RequiredIndicator />;
}

function FormField({ field }: { field: Field }) {
  const spanClass =
    field.span === 'full'
      ? 'lg:col-span-3'
      : field.span === 'two'
        ? 'lg:col-span-2'
        : field.type === 'textarea'
          ? 'lg:col-span-3'
          : '';

  return (
    <Label className={spanClass}>
      <span className="flex items-center gap-1 text-xs font-bold text-[#111827]">
        {field.label}
        {field.required && <RequiredMark />}
      </span>
      <span className="mt-2 block">
        {field.type === 'select' ? (
          <Select defaultValue={field.value}>
            {(field.options || [field.value]).map((option) => (
              <option key={option}>{option}</option>
            ))}
          </Select>
        ) : field.type === 'textarea' ? (
          <Textarea defaultValue={field.value} placeholder={field.placeholder} />
        ) : (
          <Input defaultValue={field.value} placeholder={field.placeholder} prefix={field.prefix} />
        )}
      </span>
      {field.helper && <span className="mt-2 block text-xs font-medium text-[#6B7280]">{field.helper}</span>}
    </Label>
  );
}

export function FieldSection({ group }: { group: FieldGroup }) {
  const Icon = group.icon;

  return (
    <section className="border-t border-[#EEF1F7] pt-5 first:border-t-0 first:pt-0">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEF2FF] text-[#2E3A8C]">
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="text-sm font-black text-[#111827]">{group.title}</h3>
      </div>
      <div className="grid gap-x-6 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
        {group.fields.map((field) => (
          <FormField key={`${group.title}-${field.label}`} field={field} />
        ))}
      </div>
    </section>
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
    <div className="mt-6 flex flex-col gap-3 border-t border-[#EEF2F7] pt-5 sm:flex-row sm:items-center sm:justify-end">
      <Button type="button" variant="secondary" className="border-[#FFB176] bg-[#FFF3EA] text-[#C45B00] hover:bg-[#FFE8D4]">
        {draftLabel}
      </Button>
      <Button type="submit" className="px-6">
        {submitLabel}
      </Button>
    </div>
  );
}
