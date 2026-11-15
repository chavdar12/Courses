import { useState } from 'react';
import Counter from './components/Counter';
import Timer from './components/Timer';
import RegisterForm from './components/RegisterForm';
import ThemedButton from './components/ThemedButton';
import { ThemeProvider } from './ThemeContext';

export default function App() {
    const [showTimer, setShowTimer] = useState(true);

    return (
        <ThemeProvider>
            <main>
                <h2>State hook</h2>
                <Counter />
                <RegisterForm />
                <h2>Effect hook</h2>
                <button onClick={() => setShowTimer((s) => !s)}>
                    {showTimer ? 'Hide' : 'Show'} timer
                </button>
                {showTimer && <Timer />}
                <h2>Context</h2>
                <ThemedButton />
            </main>
        </ThemeProvider>
    );
}
