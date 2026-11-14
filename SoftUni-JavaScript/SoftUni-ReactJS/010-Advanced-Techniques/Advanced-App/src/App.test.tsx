import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import {todoReducer} from './components/todoReducer';

test('reducer adds, toggles and removes without mutating', () => {
    const empty = Object.freeze([]);
    const one = todoReducer(empty, {type: 'add', text: 'Learn React'});
    expect(one).toEqual([{id: 1, text: 'Learn React', done: false}]);
    expect(todoReducer(one, {type: 'toggle', id: 1})[0].done).toBe(true);
    expect(todoReducer(one, {type: 'remove', id: 1})).toEqual([]);
    expect(todoReducer(one, {type: 'add', text: 'x'}).map(t => t.id)).toEqual([1, 2]);
});

test('HOC hides the todo list from guests', () => {
    render(<App/>);
    expect(screen.getByText('Please log in to see this.')).toBeInTheDocument();
    expect(screen.queryByLabelText('New todo')).not.toBeInTheDocument();
});

test('context login reaches the wrapped component', async () => {
    render(<App/>);
    await userEvent.click(screen.getByRole('button', {name: 'Login as Pesho'}));
    expect(screen.getByText('Pesho\'s todos')).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('New todo'), 'Write tests{Enter}');
    await userEvent.click(screen.getByLabelText('Write tests'));
    expect(screen.getByLabelText('Write tests')).toBeChecked();
    await userEvent.click(screen.getByRole('button', {name: 'Remove Write tests'}));
    expect(screen.queryByText('Write tests')).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', {name: 'Logout'}));
    expect(screen.getByText('Please log in to see this.')).toBeInTheDocument();
});

test('error boundary shows a fallback and recovers', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {}); // React logs caught errors
    render(<App/>);
    for (let i = 0; i < 3; i++) await userEvent.click(screen.getByRole('button', {name: /Buggy count/}));
    expect(screen.getByRole('alert')).toHaveTextContent('I crashed at 3!');
    expect(screen.getByRole('heading', {name: 'Context + HOC + useReducer'})).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', {name: 'Try again'}));
    expect(screen.getByRole('button', {name: 'Buggy count: 0'})).toBeInTheDocument();
});
