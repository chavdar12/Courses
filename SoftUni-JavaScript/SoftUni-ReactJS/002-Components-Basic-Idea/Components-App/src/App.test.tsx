import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('passes props and children to function and class components', () => {
    render(<App/>);
    expect(screen.getByText('Stephen King')).toBeInTheDocument();
    expect(screen.getByText('Some value here')).toBeInTheDocument();
    expect(screen.getByText('Frank Herbert')).toBeInTheDocument();
});

test('class counter updates its state', async () => {
    render(<App/>);
    await userEvent.click(screen.getByText('Clicked 0 times'));
    expect(screen.getByText('Clicked 1 times')).toBeInTheDocument();
});

test('stateful input shows what is typed', async () => {
    render(<App/>);
    await userEvent.type(screen.getByLabelText('First name'), 'Pesho');
    expect(screen.getByText('Pesho', {selector: 'p'})).toBeInTheDocument();
});

test('child button reports clicks to the parent', async () => {
    render(<App/>);
    await userEvent.click(screen.getByText(/I'm a counter \[0]/));
    expect(screen.getByText(/I'm a counter \[1]/)).toBeInTheDocument();
});

test('passes an argument to the handler', async () => {
    render(<App/>);
    await userEvent.click(screen.getByText('Delete Row 2'));
    expect(screen.queryByText('Delete Row 2')).not.toBeInTheDocument();
    expect(screen.getByText('Delete Row 1')).toBeInTheDocument();
});

test('renders the greeting for each login state', () => {
    render(<App/>);
    expect(screen.getByText('Please sign up.')).toBeInTheDocument();
    expect(screen.getByText('Welcome back!')).toBeInTheDocument();
});
