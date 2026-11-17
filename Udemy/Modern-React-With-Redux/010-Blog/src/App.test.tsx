import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { API_URL } from './api';
import { makeStore } from './store';

const posts = [
    { id: 1, userId: 1, title: 'First post', body: 'Hello' },
    { id: 2, userId: 1, title: 'Second post', body: 'Again' },
    { id: 3, userId: 2, title: 'Third post', body: 'Hi' },
];
const users: Record<string, { id: number; name: string }> = {
    '1': { id: 1, name: 'Ana Petrova' },
    '2': { id: 2, name: 'Boris Ivanov' },
};

const mockApi = (postsOk = true) =>
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
        const url = new URL(input instanceof Request ? input.url : String(input));
        const user = url.pathname.match(/^\/users\/(\d+)$/)?.[1];
        if (url.pathname === '/posts' && postsOk) return Response.json(posts);
        if (user && users[user]) return Response.json(users[user]);
        return new Response('{}', { status: 500 });
    });

const renderApp = () =>
    render(
        <Provider store={makeStore()}>
            <App />
        </Provider>,
    );

const requested = () =>
    vi.mocked(fetch).mock.calls.map(([i]) => (i instanceof Request ? i.url : String(i)));

afterEach(() => vi.restoreAllMocks());

test('renders the posts with their authors, fetching each author once', async () => {
    mockApi();
    renderApp();
    expect(screen.getByRole('status')).toHaveTextContent('Loading posts');
    expect(await screen.findByRole('heading', { name: 'Third post' })).toBeInTheDocument();
    expect(await screen.findAllByText('Ana Petrova')).toHaveLength(2);
    expect(await screen.findByText('Boris Ivanov')).toBeInTheDocument();

    expect(requested()).toContain(`${API_URL}/posts?_limit=10`);
    expect(requested().filter((u) => u.endsWith('/users/1'))).toHaveLength(1);
});

test('shows an error when the posts cannot be loaded', async () => {
    mockApi(false);
    renderApp();
    expect(await screen.findByRole('alert')).toHaveTextContent('Could not load posts');
});
