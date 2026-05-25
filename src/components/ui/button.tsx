import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

const variants: Record<ButtonVariant, string> = {
  primary: 'border-transparent bg-[#FF6A00] text-white shadow-[0_12px_24px_rgba(255,106,0,0.24)] hover:bg-[#F05F00]',
  secondary: 'border-[#DCE2F8] bg-white text-[#1F2A6D] hover:border-[#FF6A00]/40 hover:bg-[#FFF6EF]',
  outline: 'border-[#D7DDEB] bg-white text-[#1F2A6D] hover:bg-[#F8FAFE]',
  ghost: 'border-transparent bg-transparent text-[#1F2A6D] hover:bg-[#EEF2FF]',
  destructive: 'border-transparent bg-[#DC2626] text-white shadow-[0_12px_24px_rgba(220,38,38,0.18)] hover:bg-[#B91C1C]',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 gap-1.5 rounded-md px-3 text-[11px]',
  md: 'h-10 gap-2 rounded-md px-5 text-xs',
  lg: 'h-11 gap-2 rounded-lg px-6 text-sm',
  icon: 'h-9 w-9 rounded-md p-0',
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex shrink-0 items-center justify-center border font-black transition outline-none disabled:pointer-events-none disabled:opacity-60 focus-visible:ring-4 focus-visible:ring-[#FF6A00]/15',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
