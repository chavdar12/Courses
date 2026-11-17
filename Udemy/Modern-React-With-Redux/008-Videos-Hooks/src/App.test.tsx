import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import type { Video } from './api';

const video = (id: string, title: string): Video => ({
    id: { videoId: id },
    snippet: {
        title,
        description: `${title} description`,
        thumbnails: { medium: { url: `https://img/${id}` } },
    },
});

const mockFetch = (...bodies: { items: Video[] }[]) => {
    const spy = vi.spyOn(globalThis, 'fetch');
    for (const body of bodies)
        spy.mockResolvedValueOnce({ ok: true, json: async () => body } as Response);
    return spy;
};

afterEach(() => vi.restoreAllMocks());

test('searches on start and shows the first video', async () => {
    mockFetch({ items: [video('a1', 'Hooks intro'), video('b2', 'useEffect')] });
    render(<App />);
    expect(await screen.findByTitle('Hooks intro')).toHaveAttribute(
        'src',
        'https://www.youtube.com/embed/a1',
    );
    const url = new URL(vi.mocked(fetch).mock.calls[0][0] as string);
    expect(url.searchParams.get('q')).toBe('react hooks');
    expect(url.searchParams.get('type')).toBe('video');
});

test('selecting a video from the list shows it in the player', async () => {
    mockFetch({ items: [video('a1', 'Hooks intro'), video('b2', 'useEffect')] });
    render(<App />);
    await userEvent.click(await screen.findByRole('button', { name: 'useEffect' }));
    expect(screen.getByTitle('useEffect')).toHaveAttribute(
        'src',
        'https://www.youtube.com/embed/b2',
    );
    expect(screen.getByText('useEffect description')).toBeInTheDocument();
});

test('a new search replaces the list and the player', async () => {
    mockFetch({ items: [video('a1', 'Hooks intro')] }, { items: [video('c3', 'Redux toolkit')] });
    render(<App />);
    await screen.findByTitle('Hooks intro');
    await userEvent.type(screen.getByLabelText('Video search'), 'redux{enter}');
    expect(await screen.findByTitle('Redux toolkit')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Hooks intro' })).not.toBeInTheDocument();
});

test('shows an error when the API fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false, status: 403 } as Response);
    render(<App />);
    expect(await screen.findByRole('alert')).toHaveTextContent('YouTube search failed (403)');
});
