import { useState } from 'react';

export type Item = { title: string; content: string };

export default function Accordion({ items }: { items: Item[] }) {
    const [open, setOpen] = useState<number | null>(null);
    return (
        <div className="accordion">
            {items.map((item, i) => (
                <div key={item.title}>
                    <button
                        aria-expanded={open === i}
                        onClick={() => setOpen(open === i ? null : i)}
                    >
                        {item.title}
                    </button>
                    <p hidden={open !== i}>{item.content}</p>
                </div>
            ))}
        </div>
    );
}
