import {render, screen} from '@testing-library/react';
import App from './App';
import {API_URL, type Post} from './api';

const posts: Post[] = [
    {_id: '1', description: 'First crane', author: {username: 'pesho'}},
    {_id: '2', description: 'Paper frog', author: {username: 'maria'}},
];

const mockFetch = (body: unknown, ok = true) =>
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ok, status: ok ? 200 : 500, json: async () => body} as Response);

afterEach(() => vi.restoreAllMocks());

test('renders the layout with the required class names', () => {
    mockFetch([]);
    const {container} = render(<App/>);
    for (const cls of ['Navigation', 'Aside', 'Main', 'Posts', 'Footer']) {
        expect(container.querySelector(`.${cls}`)).toBeInTheDocument();
    }
    // header, aside and footer each list every link
    expect(container.querySelectorAll('.listItem')).toHaveLength(15);
});

test('fetches posts from the API and renders each one', async () => {
    mockFetch(posts);
    const {container} = render(<App/>);
    expect(await screen.findByText('First crane')).toHaveClass('description');
    expect(container.querySelectorAll('.Post')).toHaveLength(2);
    expect(screen.getByText('maria')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith(API_URL);
});

test('shows an error when the API fails', async () => {
    mockFetch({}, false);
    render(<App/>);
    expect(await screen.findByRole('alert')).toHaveTextContent('Could not load posts (500)');
});
