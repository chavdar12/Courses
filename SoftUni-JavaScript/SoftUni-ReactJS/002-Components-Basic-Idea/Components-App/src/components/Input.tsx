import { Component, type ChangeEvent } from 'react';

/** Stateless: only props. */
function Show({ value }: { value: string }) {
    return <p>{value}</p>;
}

/** Stateful: owns the value and hands it down to Show. */
export default class Input extends Component<object, { value: string }> {
    state = { value: '' };

    handleChange = (event: ChangeEvent<HTMLInputElement>) =>
        this.setState({ value: event.target.value });

    render() {
        return (
            <div>
                <input
                    aria-label="First name"
                    name="firstName"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
                <Show value={this.state.value} />
            </div>
        );
    }
}
