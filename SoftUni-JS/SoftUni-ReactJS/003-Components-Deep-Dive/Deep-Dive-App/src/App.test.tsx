import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import Clock from './components/Clock';

const mockFetch = (body: object, ok = true) =>
    vi
        .spyOn(globalThis, 'fetch')
        .mockResolvedValue({ ok, status: ok ? 200 : 404, json: async () => body } as Response);

beforeEach(() => mockFetch({ login: 'k1r1L', name: 'Kiril', public_repos: 7 }));
afterEach(() => vi.restoreAllMocks());

test('renders doubled numbers from a keyed list', () => {
    render(<App />);
    const items = screen.getAllByRole('list')[0].querySelectorAll('li');
    expect([...items].map((li) => li.textContent)).toEqual(['2', '4', '6', '8', '10']);
});

test('the HOC logs when the wrapped component mounts', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<App />);
    expect(log).toHaveBeenCalledWith('NumberList mounted');
});

test('clock ticks while mounted and clears its timer on unmount', () => {
    vi.useFakeTimers();
    const clear = vi.spyOn(globalThis, 'clearInterval');
    const { unmount } = render(<Clock />);
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.getByText('Mounted for 3s')).toBeInTheDocument();
    unmount();
    expect(clear).toHaveBeenCalled();
    vi.useRealTimers();
});

test('the toggle unmounts the clock', async () => {
    render(<App />);
    await userEvent.click(screen.getByText('Unmount clock'));
    expect(screen.queryByText(/Mounted for/)).not.toBeInTheDocument();
});

test('CSS module class is applied', () => {
    render(<App />);
    expect(screen.getByText('Error Button').className).toMatch(/error/);
});

test('loads data through the fetch service', async () => {
    render(<App />);
    expect(await screen.findByText('Kiril has 7 public repos')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith('https://api.github.com/users/k1r1L');
});

test('shows the fetch error', async () => {
    vi.restoreAllMocks();
    mockFetch({}, false);
    render(<App />);
    expect(await screen.findByRole('alert')).toHaveTextContent('GitHub returned 404');
});
