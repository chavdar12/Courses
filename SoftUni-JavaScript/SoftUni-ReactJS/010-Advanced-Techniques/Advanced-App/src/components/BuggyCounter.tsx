import {useState} from 'react';

export default function BuggyCounter() {
    const [count, setCount] = useState(0);
    if (count === 3) throw new Error('I crashed at 3!');
    return <button onClick={() => setCount(c => c + 1)}>Buggy count: {count}</button>;
}
