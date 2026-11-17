import { Component, createRef, type FormEvent } from 'react';

/** Uncontrolled form: the DOM keeps the value, a ref reads it on submit. */
export default class NameForm extends Component {
    input = createRef<HTMLInputElement>();

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        alert('A name was submitted: ' + this.input.current!.value);
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Name (uncontrolled)</h2>
                <label>
                    Name:
                    <input type="text" ref={this.input} defaultValue="Pesho" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
