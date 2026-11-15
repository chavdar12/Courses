import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

/** Several useState calls side by side; the email draft uses the custom hook. */
export default function RegisterForm() {
    const [email, setEmail] = useLocalStorage('draft-email', '');
    const [age, setAge] = useState('0');
    const [password, setPassword] = useState('');

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <label>
                Email <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Age <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            </label>
            <label>
                Password{' '}
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <p>
                {email || 'nobody'}, {age} years old, password {password.length ? 'set' : 'empty'}
            </p>
        </form>
    );
}
