import { render, screen } from '@testing-library/react';
import App from './App';

test('greets by name', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello Maria');
});

test('createElement renders the same as JSX', () => {
    render(<App />);
    expect(screen.getByText('Children Text')).toHaveClass('red');
});

test('evaluates expressions inside braces', () => {
    render(<App />);
    expect(screen.getByText('3 + 5 = 8')).toBeInTheDocument();
});

test('renders the scores passed as a prop', () => {
    render(<App />);
    expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual([
        'player1: 2',
        'player2: 5',
    ]);
});

test('composes nested components', () => {
    render(<App />);
    expect(screen.getByText('Hello, from React')).toBeInTheDocument();
    expect(screen.getByText('C ya, from React')).toBeInTheDocument();
});
