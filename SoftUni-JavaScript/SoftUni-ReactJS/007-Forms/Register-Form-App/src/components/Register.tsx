import { Component, type ChangeEvent, type FormEvent } from 'react';
import { validate, type Errors, type RegisterData } from './validate';

type State = RegisterData & { errors: Errors; touched: boolean; registered?: string };

/** Controlled form: React state is the single source of truth for every input. */
export default class Register extends Component<object, State> {
    state: State = {
        email: '',
        password: '',
        repeatPassword: '',
        country: '',
        terms: false,
        errors: {},
        touched: false,
    };

    changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        // Email is normalised as you type: the input shows what state holds
        const next =
            type === 'checkbox'
                ? (e.target as HTMLInputElement).checked
                : name === 'email'
                  ? value.toLowerCase()
                  : value;
        this.setState((prev) => {
            const data = { ...prev, [name]: next };
            return { ...data, errors: prev.touched ? validate(data) : {} };
        });
    };

    submitHandler = (e: FormEvent) => {
        e.preventDefault();
        const errors = validate(this.state);
        this.setState({
            errors,
            touched: true,
            registered: Object.keys(errors).length ? undefined : this.state.email,
        });
    };

    render() {
        const { email, password, repeatPassword, country, terms, errors, registered } = this.state;
        const error = (field: keyof Errors) =>
            errors[field] && <span className="error">{errors[field]}</span>;

        return (
            <form onSubmit={this.submitHandler} noValidate>
                <h2>Register (controlled)</h2>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={this.changeHandler}
                    />
                    {error('email')}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={this.changeHandler}
                    />
                    {error('password')}
                </div>
                <div>
                    <label htmlFor="repeatPassword">Repeat password:</label>
                    <input
                        id="repeatPassword"
                        name="repeatPassword"
                        type="password"
                        value={repeatPassword}
                        onChange={this.changeHandler}
                    />
                    {error('repeatPassword')}
                </div>
                <div>
                    <label htmlFor="country">Country:</label>
                    <select
                        id="country"
                        name="country"
                        value={country}
                        onChange={this.changeHandler}
                    >
                        <option value="">--</option>
                        <option value="BG">Bulgaria</option>
                        <option value="DE">Germany</option>
                    </select>
                    {error('country')}
                </div>
                <div>
                    <label>
                        <input
                            name="terms"
                            type="checkbox"
                            checked={terms}
                            onChange={this.changeHandler}
                        />{' '}
                        I accept the terms
                    </label>
                    {error('terms')}
                </div>
                <button type="submit">Register</button>
                {registered && <p role="status">Registered {registered}</p>}
            </form>
        );
    }
}
