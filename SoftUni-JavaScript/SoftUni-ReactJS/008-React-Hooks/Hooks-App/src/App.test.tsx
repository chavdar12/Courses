import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import Timer from './components/Timer';
import { useLocalStorage } from './hooks/useLocalStorage';

beforeEach(() => localStorage.clear());

test('useState counter updates and the effect syncs the title', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: 'Click me' }));
    expect(screen.getByText('Counter: 1')).toBeInTheDocument();
    expect(document.title).toBe('The counter reached: 1 times');
});

test('timer effect ticks and cleans up its interval', () => {
    vi.useFakeTimers();
    const clear = vi.spyOn(globalThis, 'clearInterval');
    const { unmount } = render(<Timer />);
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByText('Timer: 2s')).toBeInTheDocument();
    unmount();
    expect(clear).toHaveBeenCalled();
    vi.useRealTimers();
});

test('useLocalStorage persists and restores the value', () => {
    const first = renderHook(() => useLocalStorage('k', 'a'));
    act(() => first.result.current[1]('b'));
    expect(localStorage.getItem('k')).toBe('"b"');
    expect(renderHook(() => useLocalStorage('k', 'a')).result.current[0]).toBe('b');
});

test('useLocalStorage falls back on corrupt data', () => {
    localStorage.setItem('k', '{oops');
    expect(renderHook(() => useLocalStorage('k', 'default')).result.current[0]).toBe('default');
});

test('form keeps several pieces of state', async () => {
    render(<App />);
    await userEvent.type(screen.getByLabelText('Email'), 'a@b.bg');
    await userEvent.type(screen.getByLabelText('Password'), 'x');
    expect(screen.getByText('a@b.bg, 0 years old, password set')).toBeInTheDocument();
});

test('context provides and toggles the theme', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: 'Theme: light' }));
    expect(screen.getByRole('button', { name: 'Theme: dark' })).toHaveStyle({ color: '#ffffff' });
});
