import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MemoryRouter} from 'react-router';
import App from './App';

const renderAt = (path: string) => render(
    <MemoryRouter initialEntries={[path]}>
        <App/>
    </MemoryRouter>,
);

test('renders the home page on /', () => {
    renderAt('/');
    expect(screen.getByRole('heading', {name: 'Public home page'})).toBeInTheDocument();
});

test('reads URL params', () => {
    renderAt('/catalog/electronics/XYZ5538');
    expect(screen.getByRole('heading', {name: 'Catalog: electronics for user XYZ5538'})).toBeInTheDocument();
});

test('marks the current link as active', () => {
    renderAt('/about');
    expect(screen.getByRole('link', {name: 'About'})).toHaveClass('active');
    expect(screen.getByRole('link', {name: 'Home'})).not.toHaveClass('active');
});

test('renders a nested route inside its parent', async () => {
    renderAt('/about');
    await userEvent.click(screen.getByRole('link', {name: 'Contact'}));
    expect(screen.getByText(/contact@example.com/)).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'About Page'})).toBeInTheDocument();
});

test('logging in redirects home to the lazy-loaded dashboard', async () => {
    renderAt('/');
    await userEvent.click(screen.getByRole('button', {name: 'Login'}));
    expect(await screen.findByRole('heading', {name: 'Dashboard'})).toBeInTheDocument();
});

test('guests are redirected away from the dashboard', () => {
    renderAt('/dashboard');
    expect(screen.getByRole('heading', {name: 'Public home page'})).toBeInTheDocument();
});

test('unknown routes show 404', () => {
    renderAt('/no/such/page');
    expect(screen.getByRole('heading', {name: /404/})).toBeInTheDocument();
});
