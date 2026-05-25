import type { ReactNode } from 'react';
import { Building2, Upload } from 'lucide-react';
import { Button } from './button';

export function FileUpload({
  title = 'Upload File',
  helper = 'PNG, JPG up to 2MB. Recommended: 200x200px',
  actionLabel = 'Upload',
  preview,
  placeholder,
}: {
  title?: string;
  helper?: string;
  actionLabel?: string;
  preview?: ReactNode;
  placeholder?: ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold text-[#111827]">{title}</p>
      <div className="flex items-center gap-3">
        <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-lg border border-[#D7DDEB] bg-[#F8FAFE]">
          {preview || placeholder || <Building2 className="h-5 w-5 text-[#6B7280]" />}
        </div>
        <div>
          <Button variant="secondary" size="sm" leftIcon={<Upload className="h-3.5 w-3.5" />}>
            {actionLabel}
          </Button>
          {helper && <p className="mt-2 text-[11px] font-medium text-[#6B7280]">{helper}</p>}
        </div>
      </div>
    </div>
  );
}
