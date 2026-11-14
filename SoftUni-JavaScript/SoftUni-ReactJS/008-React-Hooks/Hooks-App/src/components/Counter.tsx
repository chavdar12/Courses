import {useEffect, useState} from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);

    // Runs after every render where count changed
    useEffect(() => {
        document.title = `The counter reached: ${count} times`;
    }, [count]);

    return (
        <div>
            <p>Counter: {count}</p>
            <button onClick={() => setCount(c => c + 1)}>Click me</button>
        </div>
    );
}
