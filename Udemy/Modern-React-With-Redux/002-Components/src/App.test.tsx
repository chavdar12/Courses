import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App, { comments } from './App';

test('wraps every comment in an approval card', () => {
    render(<App />);
    for (const c of comments) {
        expect(screen.getByText(c.text)).toBeInTheDocument();
        expect(screen.getByAltText(`${c.author}'s avatar`)).toBeInTheDocument();
    }
    expect(screen.getAllByRole('button', { name: 'Approve' })).toHaveLength(comments.length + 1);
});

test('approving or rejecting a card replaces its buttons with the decision', async () => {
    const { container } = render(<App />);
    const [first, second] = container.querySelectorAll<HTMLElement>('.card');
    await userEvent.click(within(first).getByRole('button', { name: 'Approve' }));
    expect(within(first).getByRole('status')).toHaveTextContent('Approved');
    expect(within(first).queryByRole('button')).not.toBeInTheDocument();

    await userEvent.click(within(second).getByRole('button', { name: 'Reject' }));
    expect(within(second).getByRole('status')).toHaveTextContent('Rejected');
});
