import { createElement } from 'react';
import HelloMessage from './components/HelloMessage';
import ComponentBlender from './components/ComponentBlender';
import Scoreboard from './components/Scoreboard';

const gameScores = { player1: 2, player2: 5 };

export default function App() {
    return (
        <main>
            <HelloMessage name="Maria" />
            {/* JSX compiles to exactly this call */}
            {createElement('div', { className: 'red' }, 'Children Text')}
            <p>3 + 5 = {3 + 5}</p>
            <Scoreboard scores={gameScores} />
            <ComponentBlender />
        </main>
    );
}
