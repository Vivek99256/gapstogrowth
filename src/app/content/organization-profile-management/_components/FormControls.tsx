import { ChevronDown } from 'lucide-react';
import type { Field, FieldGroup } from './types';

export function RequiredMark() {
  return <span className="text-[#FF6A00]" aria-hidden="true">*</span>;
}

function FormField({ field }: { field: Field }) {
  const baseInput =
    'mt-2 w-full rounded-md border border-[#D7DDEB] bg-white px-3 text-xs font-semibold text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FF6A00] focus:ring-4 focus:ring-[#FF6A00]/10';

  const spanClass =
    field.span === 'full'
      ? 'lg:col-span-3'
      : field.span === 'two'
        ? 'lg:col-span-2'
        : field.type === 'textarea'
          ? 'lg:col-span-3'
          : '';

  return (
    <label className={spanClass}>
      <span className="flex items-center gap-1 text-xs font-bold text-[#111827]">
        {field.label}
        {field.required && <RequiredMark />}
      </span>
      <span className="relative block">
        {field.type === 'select' ? (
          <>
            <select className={`${baseInput} h-10 appearance-none pr-9`} defaultValue={field.value}>
              {(field.options || [field.value]).map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2E3A8C]" />
          </>
        ) : field.type === 'textarea' ? (
          <textarea className={`${baseInput} min-h-16 py-2.5`} defaultValue={field.value} placeholder={field.placeholder} />
        ) : (
          <span className="mt-2 flex h-10 overflow-hidden rounded-md border border-[#D7DDEB] bg-white focus-within:border-[#FF6A00] focus-within:ring-4 focus-within:ring-[#FF6A00]/10">
            {field.prefix && (
              <span className="inline-flex items-center border-r border-[#E4E9F4] bg-[#F8FAFE] px-3 text-xs font-bold text-[#1F2A6D]">
                {field.prefix}
              </span>
            )}
            <input
              className="min-w-0 flex-1 bg-transparent px-3 text-xs font-semibold text-[#111827] outline-none placeholder:text-[#9CA3AF]"
              defaultValue={field.value}
              placeholder={field.placeholder}
            />
          </span>
        )}
      </span>
      {field.helper && <span className="mt-2 block text-xs font-medium text-[#6B7280]">{field.helper}</span>}
    </label>
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
      <button
        type="button"
        className="h-10 rounded-md border border-[#FFB176] bg-[#FFF3EA] px-5 text-xs font-black text-[#C45B00] transition hover:bg-[#FFE8D4]"
      >
        {draftLabel}
      </button>
      <button
        type="submit"
        className="h-10 rounded-md bg-[#FF6A00] px-6 text-xs font-black text-white shadow-[0_12px_24px_rgba(255,106,0,0.24)] transition hover:bg-[#F05F00]"
      >
        {submitLabel}
      </button>
    </div>
  );
}
