import { useState, type FormEvent } from 'react';
import type { StreamInput } from '../api';

type Props = {
    initial?: StreamInput;
    submitLabel: string;
    onSubmit: (values: StreamInput) => void;
};

export function validate({ title, description }: StreamInput) {
    const errors: Partial<StreamInput> = {};
    if (!title.trim()) errors.title = 'You must enter a title';
    else if (title.length > 100) errors.title = 'The title can be at most 100 characters';
    if (!description.trim()) errors.description = 'You must enter a description';
    else if (description.length > 1000)
        errors.description = 'The description can be at most 1000 characters';
    return errors;
}

export default function StreamForm({
    initial = { title: '', description: '' },
    submitLabel,
    onSubmit,
}: Props) {
    const [values, setValues] = useState(initial);
    const [errors, setErrors] = useState<Partial<StreamInput>>({});

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const found = validate(values);
        setErrors(found);
        if (Object.keys(found).length === 0)
            onSubmit({ title: values.title.trim(), description: values.description.trim() });
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            {(['title', 'description'] as const).map((field) => (
                <div key={field}>
                    <label>
                        {field === 'title' ? 'Title' : 'Description'}
                        <input
                            value={values[field]}
                            aria-invalid={Boolean(errors[field])}
                            onChange={(e) => setValues({ ...values, [field]: e.target.value })}
                        />
                    </label>
                    {errors[field] && <span role="alert">{errors[field]}</span>}
                </div>
            ))}
            <button>{submitLabel}</button>
        </form>
    );
}
