import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { API_URL } from './api';

const mockFetch = (body: unknown, ok = true) =>
    vi
        .spyOn(globalThis, 'fetch')
        .mockResolvedValue({ ok, status: ok ? 200 : 401, json: async () => body } as Response);

afterEach(() => vi.restoreAllMocks());

test('searches Unsplash for the trimmed term and renders the images', async () => {
    mockFetch({
        results: [{ id: '1', alt_description: 'a red car', urls: { regular: 'https://img/1' } }],
    });
    render(<App />);
    await userEvent.type(screen.getByLabelText('Image search'), '  cars {enter}');

    expect(await screen.findByAltText('a red car')).toHaveAttribute('src', 'https://img/1');
    expect(screen.getByText('Found: 1 images')).toBeInTheDocument();
    const [url, init] = vi.mocked(fetch).mock.calls[0];
    expect(url).toBe(`${API_URL}?query=cars`);
    expect((init?.headers as Record<string, string>).Authorization).toMatch(/^Client-ID /);
});

test('does not search for a blank term', async () => {
    mockFetch({ results: [] });
    render(<App />);
    await userEvent.type(screen.getByLabelText('Image search'), '   {enter}');
    expect(fetch).not.toHaveBeenCalled();
});

test('shows an error when the API rejects the request', async () => {
    mockFetch({}, false);
    render(<App />);
    await userEvent.type(screen.getByLabelText('Image search'), 'cars{enter}');
    expect(await screen.findByRole('alert')).toHaveTextContent('Unsplash search failed (401)');
});
