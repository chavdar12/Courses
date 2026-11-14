import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import {validate} from './components/validate';

const valid = {email: 'a@b.bg', password: '123456', repeatPassword: '123456', country: 'BG', terms: true};

test('validate accepts good data and flags each bad field', () => {
    expect(validate(valid)).toEqual({});
    expect(Object.keys(validate({email: 'nope', password: '1', repeatPassword: '2', country: '', terms: false})))
        .toEqual(['email', 'password', 'repeatPassword', 'country', 'terms']);
});

test('controlled input shows the value held in state (lowercased)', async () => {
    render(<App/>);
    await userEvent.type(screen.getByLabelText('Email:'), 'PESHO@ABV.BG');
    expect(screen.getByLabelText('Email:')).toHaveValue('pesho@abv.bg');
});

test('submitting an empty form shows the errors, fixing a field clears its error', async () => {
    render(<App/>);
    await userEvent.click(screen.getByRole('button', {name: 'Register'}));
    expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
    expect(screen.getByText('You must accept the terms')).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText('Email:'), 'a@b.bg');
    expect(screen.queryByText('Enter a valid email')).not.toBeInTheDocument();
});

test('a valid form registers', async () => {
    render(<App/>);
    await userEvent.type(screen.getByLabelText('Email:'), 'a@b.bg');
    await userEvent.type(screen.getByLabelText('Password:'), '123456');
    await userEvent.type(screen.getByLabelText('Repeat password:'), '123456');
    await userEvent.selectOptions(screen.getByLabelText('Country:'), 'BG');
    await userEvent.click(screen.getByLabelText('I accept the terms'));
    await userEvent.click(screen.getByRole('button', {name: 'Register'}));
    expect(screen.getByRole('status')).toHaveTextContent('Registered a@b.bg');
});

test('uncontrolled form reads the value through a ref', async () => {
    const alert = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<App/>);
    await userEvent.clear(screen.getByLabelText('Name:'));
    await userEvent.type(screen.getByLabelText('Name:'), 'Gosho');
    await userEvent.click(screen.getByRole('button', {name: 'Submit'}));
    expect(alert).toHaveBeenCalledWith('A name was submitted: Gosho');
});
