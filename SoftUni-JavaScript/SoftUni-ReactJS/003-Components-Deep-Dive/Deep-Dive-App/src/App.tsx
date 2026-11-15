import { useState } from 'react';
import NumberList from './components/NumberList';
import Clock from './components/Clock';
import ErrorButton from './components/ErrorButton';
import logged from './components/logged';
import GithubUser from './components/GithubUser';

const LoggedNumberList = logged(NumberList);

export default function App() {
    const [showClock, setShowClock] = useState(true);

    return (
        <main>
            <h2>Lists & keys</h2>
            <LoggedNumberList numbers={[1, 2, 3, 4, 5]} />
            <h2>Lifecycle</h2>
            <button onClick={() => setShowClock((s) => !s)}>
                {showClock ? 'Unmount' : 'Mount'} clock
            </button>
            {showClock && <Clock />}
            <h2>CSS modules</h2>
            <ErrorButton />
            <h2>Fetching data</h2>
            <GithubUser username="k1r1L" />
        </main>
    );
}
