'use client';

import {
  Children,
  isValidElement,
  type KeyboardEvent,
  type FocusEventHandler,
  type ReactNode,
  type SelectHTMLAttributes,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type SelectVariant = 'default' | 'compact';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  variant?: SelectVariant;
  maxVisibleItems?: number;
};

type OptionProps = {
  children?: ReactNode;
  disabled?: boolean;
  value?: string | number | readonly string[];
};

type SelectOption = {
  label: string;
  value: string;
  disabled: boolean;
};

const selectVariants: Record<SelectVariant, string> = {
  default: 'h-10 px-3 pr-9 text-xs',
  compact: 'h-9 px-3 pr-9 text-xs',
};

function getOptionLabel(children: ReactNode) {
  return Children.toArray(children).join('');
}

function getOptions(children: ReactNode): SelectOption[] {
  return Children.toArray(children).flatMap((child) => {
    if (!isValidElement(child) || child.type !== 'option') {
      return [];
    }

    const props = child.props as OptionProps;
    const label = getOptionLabel(props.children);

    return [
      {
        label,
        value: String(props.value ?? label),
        disabled: Boolean(props.disabled),
      },
    ];
  });
}

export function Select({
  className,
  children,
  defaultValue,
  disabled,
  id,
  maxVisibleItems = 6,
  name,
  onBlur,
  onChange,
  value,
  variant = 'default',
  ...props
}: SelectProps) {
  const reactId = useId();
  const selectId = id ?? reactId;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hiddenSelectRef = useRef<HTMLSelectElement>(null);
  const options = useMemo(() => getOptions(children), [children]);
  const isControlled = value !== undefined;
  const initialValue = String(defaultValue ?? value ?? options.find((option) => !option.disabled)?.value ?? '');
  const [internalValue, setInternalValue] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const selectedValue = String(isControlled ? value : internalValue);
  const selectedOption = options.find((option) => option.value === selectedValue) ?? options[0];
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === selectedValue),
  );
  const listboxId = `${selectId}-listbox`;
  const itemHeight = variant === 'compact' ? 36 : 40;
  const maxPanelItems = Math.max(1, maxVisibleItems);
  const maxPanelHeight = itemHeight * maxPanelItems + 8;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;

      if (triggerRef.current?.contains(target) || panelRef.current?.contains(target)) {
        return;
      }

      setIsOpen(false);
    }

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      panelRef.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, selectedValue]);

  function emitChange(nextValue: string) {
    const select = hiddenSelectRef.current;

    if (select) {
      select.value = nextValue;
    }

    onChange?.({
      currentTarget: select,
      target: select,
    } as React.ChangeEvent<HTMLSelectElement>);
  }

  function selectOption(option: SelectOption) {
    if (option.disabled || disabled) {
      return;
    }

    if (!isControlled) {
      setInternalValue(option.value);
    }

    emitChange(option.value);
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  function focusNextOption(direction: 1 | -1) {
    if (!options.length) {
      return;
    }

    let nextIndex = selectedIndex;

    for (let index = 0; index < options.length; index += 1) {
      nextIndex = (nextIndex + direction + options.length) % options.length;

      if (!options[nextIndex].disabled) {
        selectOption(options[nextIndex]);
        return;
      }
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();

      if (!isOpen) {
        setIsOpen(true);
        return;
      }

      focusNextOption(event.key === 'ArrowDown' ? 1 : -1);
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen((current) => !current);
    }

    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  }

  return (
    <span className="relative block">
      <select
        ref={hiddenSelectRef}
        aria-hidden="true"
        className="sr-only"
        defaultValue={defaultValue}
        disabled={disabled}
        id={id}
        name={name}
        tabIndex={-1}
        value={value}
        onChange={onChange}
        {...props}
      >
        {children}
      </select>
      <button
        ref={triggerRef}
        aria-controls={listboxId}
        aria-disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={cn(
          'flex w-full items-center rounded-md border border-navy-200 bg-white font-semibold text-slate-950 outline-none transition duration-150 focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400',
          selectVariants[variant],
          className,
        )}
        disabled={disabled}
        type="button"
        onBlur={onBlur as unknown as FocusEventHandler<HTMLButtonElement>}
        onClick={() => setIsOpen((current) => !current)}
        onKeyDown={handleKeyDown}
      >
        <span className="min-w-0 flex-1 truncate text-left">{selectedOption?.label}</span>
        <ChevronDown
          className={cn(
            'pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-800 transition duration-150',
            isOpen ? 'rotate-180' : '',
          )}
        />
      </button>
      {isOpen && (
        <div
          ref={panelRef}
          className="select-menu-scroll absolute left-0 z-50 mt-2 w-full overflow-y-auto rounded-lg border border-navy-200 bg-white p-1 shadow-[0_18px_48px_rgba(31,42,109,0.14)] ring-1 ring-navy-100"
          id={listboxId}
          role="listbox"
          style={{ maxHeight: `${maxPanelHeight}px` }}
        >
          {options.map((option) => {
            const isSelected = option.value === selectedValue;

            return (
              <button
                key={option.value}
                aria-selected={isSelected}
                className={cn(
                  'flex w-full items-center rounded-md border border-transparent px-3 text-left text-xs font-bold outline-none transition duration-150 focus:border-orange-700 focus:bg-orange-100 focus:text-navy-900 focus:ring-2 focus:ring-orange-700/15',
                  variant === 'compact' ? 'h-9' : 'h-10',
                  option.disabled
                    ? 'cursor-not-allowed text-slate-400'
                    : 'text-slate-600 hover:border-navy-200 hover:bg-navy-100 hover:text-navy-900',
                  isSelected ? 'border-navy-300 bg-navy-100 text-navy-900 shadow-sm' : '',
                )}
                disabled={option.disabled}
                role="option"
                type="button"
                onClick={() => selectOption(option)}
              >
                <span className="min-w-0 flex-1 truncate">{option.label}</span>
                {isSelected && <span className="ml-3 h-1.5 w-1.5 rounded-full bg-orange-700" />}
              </button>
            );
          })}
        </div>
      )}
    </span>
  );
}
