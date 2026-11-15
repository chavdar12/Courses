import type { FormEvent } from 'react';
import type { PetInput } from '../api';

const fields = ['name', 'description', 'imageUrl', 'type'] as const;
const labels = { name: 'Name', description: 'Description', imageUrl: 'Image URL', type: 'Type' };

type Props = {
    title: string;
    submit: string;
    initial?: PetInput;
    onSubmit: (pet: PetInput) => void;
};

export default function PetForm({ title, submit, initial, onSubmit }: Props) {
    const handle = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const pet = Object.fromEntries(
            fields.map((f) => [f, String(form.get(f) ?? '').trim()]),
        ) as PetInput;
        if (fields.some((f) => !pet[f])) return alert('All fields are required!');
        onSubmit(pet);
    };

    return (
        <form onSubmit={handle}>
            <h1>{title}</h1>
            {fields.map((f) => (
                <label key={f}>
                    {labels[f]}
                    {f === 'description' ? (
                        <textarea name={f} defaultValue={initial?.[f]} />
                    ) : (
                        <input name={f} defaultValue={initial?.[f]} />
                    )}
                </label>
            ))}
            <button type="submit">{submit}</button>
        </form>
    );
}
