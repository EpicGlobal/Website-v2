'use client';

/**
 * A dropdown that matches the site in every theme. A native <select> opens a list the browser draws itself
 * (Windows blue highlight, system font), so this draws the list with the site's own card, text and pop colors.
 *
 * Accessibility (WAI-ARIA "select-only combobox"): the button is a combobox that opens a listbox of options.
 * Keys: Enter/Space/Arrow keys open it; Up/Down/Home/End move; Enter or Space picks; Escape or Tab closes;
 * typing a letter jumps to the next option starting with it. Clicking outside closes it.
 */
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { FIELD } from '@/app/components/reading/reading';
import { BODY, HEAD, RULE } from '@/app/components/story/tokens';

const PANEL = `absolute left-0 right-0 z-30 mt-2 max-h-72 overflow-auto rounded-xl border p-1.5 shadow-xl shadow-black/30 focus:outline-none ${RULE} bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-xl soft-dark:bg-white light:bg-white orange:bg-white leaf:bg-white water:bg-white`;

type Props = {
  id: string;
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  labelClassName?: string;
};

export function ThemedSelect({ id, label, value, options, onChange, labelClassName = '' }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(Math.max(0, options.indexOf(value)));
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const uid = useId();
  const labelId = `${uid}-label`;
  const listId = `${uid}-list`;
  const optionId = (i: number) => `${uid}-opt-${i}`;

  // Close when clicking anywhere else.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  // Keep the highlighted option in view while moving through a long list.
  useEffect(() => {
    if (open) listRef.current?.querySelector<HTMLElement>(`#${CSS.escape(optionId(active))}`)?.scrollIntoView({ block: 'nearest' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, active]);

  const openList = (index = Math.max(0, options.indexOf(value))) => {
    setActive(index);
    setOpen(true);
  };
  const pick = (i: number) => {
    onChange(options[i]);
    setOpen(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1;
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); setActive((i) => Math.min(last, i + 1)); break;
      case 'ArrowUp': e.preventDefault(); setActive((i) => Math.max(0, i - 1)); break;
      case 'Home': e.preventDefault(); setActive(0); break;
      case 'End': e.preventDefault(); setActive(last); break;
      case 'Enter':
      case ' ': e.preventDefault(); pick(active); break;
      case 'Escape': e.preventDefault(); setOpen(false); break;
      case 'Tab': setOpen(false); break;
      default:
        if (e.key.length === 1 && /\S/.test(e.key)) {
          const k = e.key.toLowerCase();
          const order = [...options.keys()].slice(active + 1).concat([...options.keys()].slice(0, active + 1));
          const hit = order.find((i) => options[i].toLowerCase().startsWith(k));
          if (hit !== undefined) setActive(hit);
        }
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <label id={labelId} htmlFor={id} className={labelClassName}>
        {label}
      </label>
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${labelId} ${id}`}
        aria-activedescendant={open ? optionId(active) : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`${FIELD} flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-left`}
      >
        <span className="truncate">{value}</span>
        <ChevronDown aria-hidden="true" className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <ul ref={listRef} id={listId} role="listbox" aria-labelledby={labelId} tabIndex={-1} hidden={!open} className={PANEL}>
        {options.map((option, i) => {
          const selected = option === value;
          return (
            <li
              key={option}
              id={optionId(i)}
              role="option"
              aria-selected={selected}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => e.preventDefault() /* keep focus on the button */}
              onClick={() => pick(i)}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                i === active ? `bg-[var(--pop)]/15 ${HEAD}` : BODY
              } ${selected ? 'font-semibold' : ''}`}
            >
              <span>{option}</span>
              {selected ? <Check aria-hidden="true" className="w-4 h-4 flex-shrink-0 text-[var(--pop)] orange:text-orange-800" /> : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
