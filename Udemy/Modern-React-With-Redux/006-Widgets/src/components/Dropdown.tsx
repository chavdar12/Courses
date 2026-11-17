import { useEffect, useId, useRef, useState } from 'react';

export type Option = { label: string; value: string };

type Props = { label: string; options: Option[]; selected: Option; onChange: (o: Option) => void };

export default function Dropdown({ label, options, selected, onChange }: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const labelId = useId();

    // a click anywhere outside the dropdown closes it
    useEffect(() => {
        const close = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) setOpen(false);
        };
        document.body.addEventListener('click', close);
        return () => document.body.removeEventListener('click', close);
    }, []);

    return (
        <div ref={ref} className="dropdown">
            <span id={labelId}>{label}</span>
            <button
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-labelledby={labelId}
                onClick={() => setOpen(!open)}
            >
                {selected.label}
            </button>
            {open && (
                <ul role="listbox" aria-label={label}>
                    {options
                        .filter((o) => o.value !== selected.value)
                        .map((o) => (
                            <li
                                key={o.value}
                                role="option"
                                aria-selected={false}
                                onClick={() => {
                                    onChange(o);
                                    setOpen(false);
                                }}
                            >
                                {o.label}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}
