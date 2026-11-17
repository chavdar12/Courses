import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { useLanguage } from './language';

test('starts in English and switches every text to Bulgarian', async () => {
    render(<App />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toHaveClass('button', 'danger');

    await userEvent.click(screen.getByRole('button', { name: 'Български' }));
    expect(screen.getByRole('button', { name: 'Български' })).toHaveAttribute(
        'aria-pressed',
        'true',
    );
    expect(screen.getByLabelText('Име')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Изпрати' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Изберете език' })).toBeInTheDocument();
});

test('useLanguage fails loudly outside its provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useLanguage())).toThrow('inside <LanguageProvider>');
});
