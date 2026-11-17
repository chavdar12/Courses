import { render, screen } from '@testing-library/react';
import App from './App';

test('labels the input and renders the button text from a function', () => {
    render(<App />);
    expect(screen.getByLabelText('Enter name:')).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: 'Click me!' })).toHaveStyle({
        color: 'rgb(255, 255, 255)',
    });
});
