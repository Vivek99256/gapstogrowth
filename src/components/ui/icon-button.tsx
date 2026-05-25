import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type IconButtonVariant = 'primary' | 'outline' | 'ghost' | 'subtle';
type IconButtonSize = 'sm' | 'md' | 'lg';

const variants: Record<IconButtonVariant, string> = {
  primary: 'border-transparent bg-[#FF6A00] text-white shadow-[0_10px_20px_rgba(255,106,0,0.25)] hover:bg-[#F05F00]',
  outline: 'border-[#DCE3F2] bg-white text-[#1F2A6D] hover:bg-[#F4F7FB]',
  ghost: 'border-transparent bg-transparent text-[#1F2A6D] hover:bg-[#EEF2FF]',
  subtle: 'border-[#DDE4F2] bg-[#F8FAFE] text-[#2E3A8C] hover:bg-[#EEF2FF]',
};

const sizes: Record<IconButtonSize, string> = {
  sm: 'h-8 w-8 rounded-md',
  md: 'h-9 w-9 rounded-md',
  lg: 'h-10 w-10 rounded-lg',
};

export function IconButton({
  className,
  variant = 'outline',
  size = 'md',
  children,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  children: ReactNode;
}) {
  return (
    <button
      type={type}
      className={cn(
        'inline-grid shrink-0 place-items-center border transition outline-none disabled:pointer-events-none disabled:opacity-60 focus-visible:ring-4 focus-visible:ring-[#FF6A00]/15',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
