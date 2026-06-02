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
      <p className="mb-2 text-xs font-bold text-foreground">{title}</p>
      <div className="flex items-center gap-3">
        <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-lg border border-input bg-muted">
          {preview || placeholder || <Building2 className="h-5 w-5 text-muted-foreground" />}
        </div>
        <div>
          <Button variant="secondary" size="sm" leftIcon={<Upload className="h-3.5 w-3.5" />}>
            {actionLabel}
          </Button>
          {helper && <p className="mt-2 text-[11px] font-medium text-muted-foreground">{helper}</p>}
        </div>
      </div>
    </div>
  );
}
