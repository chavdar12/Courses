function Welcome() {
    return <h2>Hello, from React</h2>;
}

function Cya() {
    return <h2>C ya, from React</h2>;
}

/** Composition: components nest like DOM elements. */
export default function ComponentBlender() {
    return (
        <div>
            <Welcome />
            <Cya />
        </div>
    );
}
