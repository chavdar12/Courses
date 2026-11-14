import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MemoryRouter} from 'react-router';
import App from './App';
import {config} from './api';
import {startServer} from './test/server';

let api: Awaited<ReturnType<typeof startServer>>;
beforeEach(async () => {
    api = await startServer();
    config.baseUrl = api.url;
    sessionStorage.clear();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    vi.spyOn(window, 'confirm').mockReturnValue(true);
});
afterEach(async () => {
    vi.restoreAllMocks();
    await api.close();
});

const renderAt = (path = '/') => render(<MemoryRouter initialEntries={[path]}><App/></MemoryRouter>);

async function loginAs(email: string) {
    renderAt('/login');
    await userEvent.type(screen.getByLabelText('Email'), email);
    await userEvent.type(screen.getByLabelText('Password'), '123456');
    await userEvent.click(screen.getByRole('button', {name: 'Login'}));
    await screen.findByText(`Welcome, ${email}`);
}

const fill = async (values: Record<string, string>) => {
    for (const [label, value] of Object.entries(values)) {
        const field = screen.getByLabelText(label);
        await userEvent.clear(field);
        await userEvent.type(field, value);
    }
};

test('guests see the dashboard newest first and the guest navigation', async () => {
    renderAt();
    const cards = await screen.findAllByRole('listitem');
    expect(cards.map(c => within(c).getByRole('heading').textContent)).toEqual(['Tom', 'Max']);
    expect(screen.getByRole('link', {name: 'Login'})).toBeInTheDocument();
    expect(screen.queryByRole('link', {name: 'Add Pet'})).not.toBeInTheDocument();
});

test('login with empty fields or a wrong password alerts', async () => {
    renderAt('/login');
    await userEvent.click(screen.getByRole('button', {name: 'Login'}));
    expect(alert).toHaveBeenLastCalledWith('All fields are required!');
    await fill({Email: 'peter@abv.bg', Password: 'wrong'});
    await userEvent.click(screen.getByRole('button', {name: 'Login'}));
    await vi.waitFor(() => expect(alert).toHaveBeenLastCalledWith('Login or password don\'t match'));
});

test('register logs in and logout returns to guest navigation', async () => {
    renderAt('/register');
    await fill({Email: 'new@abv.bg', Password: 'secret'});
    await userEvent.click(screen.getByRole('button', {name: 'Register'}));
    expect(await screen.findByText('Welcome, new@abv.bg')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', {name: 'Logout'}));
    expect(await screen.findByRole('link', {name: 'Login'})).toBeInTheDocument();
    expect(sessionStorage.getItem('user')).toBeNull();
});

test('guests are sent to login from protected pages', async () => {
    renderAt('/create');
    expect(await screen.findByRole('heading', {name: 'Login'})).toBeInTheDocument();
});

test('create, edit and delete a pet', async () => {
    await loginAs('peter@abv.bg');
    await userEvent.click(screen.getByRole('link', {name: 'Add Pet'}));
    await userEvent.click(screen.getByRole('button', {name: 'Add Pet'}));
    expect(alert).toHaveBeenLastCalledWith('All fields are required!');

    await fill({Name: 'Rex', Description: 'Good boy', 'Image URL': '/images/dog.svg', Type: 'dog'});
    await userEvent.click(screen.getByRole('button', {name: 'Add Pet'}));
    await userEvent.click(within((await screen.findByText('Rex')).closest('li')!).getByRole('link', {name: 'Details'}));

    await userEvent.click(await screen.findByRole('link', {name: 'Edit'}));
    expect(await screen.findByLabelText('Name')).toHaveValue('Rex');
    await fill({Name: 'Rexy'});
    await userEvent.click(screen.getByRole('button', {name: 'Save'}));
    expect(await screen.findByRole('heading', {name: 'Rexy'})).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', {name: 'Delete'}));
    expect(confirm).toHaveBeenCalled();
    expect(await screen.findByRole('heading', {name: 'Dashboard'})).toBeInTheDocument();
    expect(await screen.findByText('Max')).toBeInTheDocument();
    expect(screen.queryByText('Rexy')).not.toBeInTheDocument();
});

test('my pets lists only the user\'s pets', async () => {
    await loginAs('peter@abv.bg');
    await userEvent.click(screen.getByRole('link', {name: 'My Pets'}));
    expect(await screen.findByText('Max')).toBeInTheDocument();
    expect(screen.queryByText('Tom')).not.toBeInTheDocument();
});

test('owner sees edit/delete but no like; others can like once', async () => {
    await loginAs('peter@abv.bg');
    await userEvent.click(within((await screen.findByText('Max')).closest('li')!).getByRole('link', {name: 'Details'}));
    expect(await screen.findByRole('link', {name: 'Edit'})).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Like'})).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('link', {name: 'Dashboard'}));
    await userEvent.click(within((await screen.findByText('Tom')).closest('li')!).getByRole('link', {name: 'Details'}));
    expect(await screen.findByText('Likes: 0')).toBeInTheDocument();
    expect(screen.queryByRole('link', {name: 'Edit'})).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', {name: 'Like'}));
    expect(await screen.findByText('Likes: 1')).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Like'})).not.toBeInTheDocument();
});

test('guests see details without any actions', async () => {
    renderAt('/details/pet-1');
    expect(await screen.findByRole('heading', {name: 'Max'})).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
});
