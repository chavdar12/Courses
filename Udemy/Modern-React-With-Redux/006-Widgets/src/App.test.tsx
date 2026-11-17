import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App, { items } from './App';
import { WIKI_URL } from './components/Search';
import { TRANSLATE_URL } from './components/Translate';

const reply = (body: unknown, ok = true) =>
    ({ ok, status: ok ? 200 : 500, json: async () => body }) as Response;

beforeEach(() => window.history.pushState({}, '', '/'));
afterEach(() => vi.restoreAllMocks());

test('accordion opens one item at a time', async () => {
    render(<App />);
    const [first, second] = screen.getAllByRole('button');
    expect(screen.getByText(items[0].content)).not.toBeVisible();
    await userEvent.click(first);
    expect(screen.getByText(items[0].content)).toBeVisible();
    await userEvent.click(second);
    expect(screen.getByText(items[0].content)).not.toBeVisible();
    expect(screen.getByText(items[1].content)).toBeVisible();
});

test('links switch pages without reloading', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('link', { name: 'Dropdown' }));
    expect(window.location.pathname).toBe('/dropdown');
    expect(screen.getByText('This text is red.')).toBeInTheDocument();
    expect(screen.queryByText(items[0].title)).not.toBeInTheDocument();
});

test('dropdown picks an option and closes on an outside click', async () => {
    window.history.pushState({}, '', '/dropdown');
    render(<App />);
    const toggle = screen.getByRole('button', { name: 'Select a color' });
    await userEvent.click(toggle);
    await userEvent.click(screen.getByRole('option', { name: 'Blue' }));
    expect(screen.getByText('This text is blue.')).toHaveStyle({ color: 'rgb(0, 0, 255)' });

    await userEvent.click(toggle);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await userEvent.click(document.body);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
});

test('search queries Wikipedia once typing stops and shows snippets as text', async () => {
    window.history.pushState({}, '', '/search');
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        reply({
            query: {
                search: [
                    {
                        pageid: 7,
                        title: 'Svelte',
                        snippet:
                            '<span class="match">Svelte</span> &amp; <img src=x onerror=alert(1)>',
                    },
                ],
            },
        }),
    );
    render(<App />);
    const input = screen.getByLabelText('Search Wikipedia');
    await userEvent.clear(input);
    await userEvent.type(input, 'svelte');

    const lastQuery = () =>
        new URL(vi.mocked(fetch).mock.calls.at(-1)![0] as string).searchParams.get('srsearch');
    await waitFor(() => expect(lastQuery()).toBe('svelte'));
    expect(await screen.findByRole('link', { name: 'Svelte' })).toHaveAttribute(
        'href',
        'https://en.wikipedia.org/?curid=7',
    );
    expect(screen.getByText('Svelte &')).toBeInTheDocument();
    expect(document.querySelector('img')).toBeNull();
    const urls = vi.mocked(fetch).mock.calls.map(([u]) => new URL(u as string));
    expect(urls.every((u) => u.origin + u.pathname === WIKI_URL)).toBe(true);
    expect(urls.length).toBeLessThanOrEqual(2); // initial term + final term, not one per key
});

test('translate sends the text and target language and shows the result', async () => {
    window.history.pushState({}, '', '/translate');
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        reply({ data: { translations: [{ translatedText: 'Hola &amp; adiós' }] } }),
    );
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: 'Language' }));
    await userEvent.click(screen.getByRole('option', { name: 'Spanish' }));
    await userEvent.type(screen.getByLabelText('Enter text'), 'Hello');

    expect(await screen.findByText('Hola & adiós')).toBeInTheDocument();
    const url = new URL(vi.mocked(fetch).mock.calls.at(-1)![0] as string);
    expect(url.origin + url.pathname).toBe(TRANSLATE_URL);
    expect(url.searchParams.get('q')).toBe('Hello');
    expect(url.searchParams.get('target')).toBe('es');
});

test('translate shows an error when the API fails', async () => {
    window.history.pushState({}, '', '/translate');
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(reply({}, false));
    render(<App />);
    await userEvent.type(screen.getByLabelText('Enter text'), 'Hello');
    expect(await screen.findByRole('alert')).toHaveTextContent('Translation failed (500)');
});
