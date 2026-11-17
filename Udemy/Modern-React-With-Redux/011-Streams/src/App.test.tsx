import type { AddressInfo } from 'node:net';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { reset, server, streams } from '../server/server';
import App from './App';
import { API_URL } from './api';
import { makeStore } from './store';

// the client talks to the real in-memory API, started on a free port
let base = '';
const realFetch = globalThis.fetch;
beforeAll(
    () =>
        new Promise<void>((done) =>
            server.listen(0, () => {
                base = `http://localhost:${(server.address() as AddressInfo).port}`;
                done();
            }),
        ),
);
afterAll(() => new Promise((done) => server.close(done)));
beforeEach(() => {
    reset();
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
        const req = input as Request;
        return realFetch(req.url.replace(API_URL, base), {
            method: req.method,
            headers: req.headers,
            body: ['GET', 'HEAD'].includes(req.method) ? undefined : await req.text(),
        });
    });
});
afterEach(() => vi.restoreAllMocks());

const renderAt = (path = '/') =>
    render(
        <Provider store={makeStore()}>
            <MemoryRouter initialEntries={[path]}>
                <App />
            </MemoryRouter>
        </Provider>,
    );

const signIn = () => userEvent.click(screen.getByRole('button', { name: 'Sign in' }));

test('lists streams; only the signed-in owner gets edit, delete and create links', async () => {
    renderAt();
    expect(await screen.findByRole('link', { name: 'Speedrunning CSS grid' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /^Edit/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Create stream' })).not.toBeInTheDocument();

    await signIn();
    expect(screen.getByRole('link', { name: 'Edit Live coding a todo app' })).toBeInTheDocument();
    expect(
        screen.queryByRole('link', { name: 'Edit Speedrunning CSS grid' }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign out' })).toBeInTheDocument();
});

test('creating a stream validates the form, saves it and goes back to the list', async () => {
    renderAt();
    await signIn();
    await userEvent.click(await screen.findByRole('link', { name: 'Create stream' }));
    await userEvent.click(screen.getByRole('button', { name: 'Create' }));
    expect(screen.getByText('You must enter a title')).toBeInTheDocument();
    expect(screen.getByText('You must enter a description')).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('Title'), 'Pairing session');
    await userEvent.type(screen.getByLabelText('Description'), 'Bring questions');
    await userEvent.click(screen.getByRole('button', { name: 'Create' }));

    expect(await screen.findByRole('link', { name: 'Pairing session' })).toBeInTheDocument();
    expect(streams.at(-1)).toMatchObject({ title: 'Pairing session', userId: 'demo-user' });
});

test('editing a stream saves the new title', async () => {
    renderAt();
    await signIn();
    await userEvent.click(await screen.findByRole('link', { name: 'Edit Live coding a todo app' }));
    const title = await screen.findByLabelText('Title');
    expect(title).toHaveValue('Live coding a todo app');
    await userEvent.clear(title);
    await userEvent.type(title, 'Live coding a blog');
    await userEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(await screen.findByRole('link', { name: 'Live coding a blog' })).toBeInTheDocument();
});

test('deleting a stream asks for confirmation first', async () => {
    renderAt();
    await signIn();
    await userEvent.click(
        await screen.findByRole('link', { name: 'Delete Live coding a todo app' }),
    );
    expect(await screen.findByRole('dialog')).toHaveTextContent('Delete "Live coding a todo app"?');
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await waitFor(() =>
        expect(
            screen.queryByRole('link', { name: 'Live coding a todo app' }),
        ).not.toBeInTheDocument(),
    );
    expect(streams).toHaveLength(1);
});

test('other users cannot edit or delete a stream by URL', async () => {
    renderAt('/streams/edit/2');
    expect(await screen.findByText('You can only edit your own streams.')).toBeInTheDocument();
});

test('show page renders a stream and reports unknown ids', async () => {
    renderAt('/streams/2');
    expect(
        await screen.findByRole('heading', { name: 'Speedrunning CSS grid' }),
    ).toBeInTheDocument();
    renderAt('/streams/999');
    expect(await screen.findByRole('alert')).toHaveTextContent('Stream not found');
});
