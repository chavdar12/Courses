const buttonText = () => 'Click me!';

export default function App() {
    const style = { backgroundColor: 'steelblue', color: 'white' };
    return (
        <div>
            <label className="label" htmlFor="name">
                Enter name:
            </label>
            <input id="name" type="text" />
            <button style={style}>{buttonText()}</button>
        </div>
    );
}
