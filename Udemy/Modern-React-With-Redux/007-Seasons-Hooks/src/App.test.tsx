import { act, render, screen } from '@testing-library/react';
import App from './App';
import { getSeason } from './SeasonDisplay';

type Success = (p: GeolocationPosition) => void;
type Failure = (e: GeolocationPositionError) => void;
let succeed: Success;
let fail: Failure;

beforeEach(() => {
    Object.defineProperty(navigator, 'geolocation', {
        configurable: true,
        value: {
            getCurrentPosition: (ok: Success, err: Failure) => {
                succeed = ok;
                fail = err;
            },
        },
    });
});

test.each([
    [42, 6, 'summer'],
    [42, 0, 'winter'],
    [-33, 6, 'winter'],
    [-33, 0, 'summer'],
    [42, 2, 'winter'],
    [42, 3, 'summer'],
    [42, 8, 'summer'],
    [42, 9, 'winter'],
])('getSeason(%d, month %d) is %s', (lat, month, season) => {
    expect(getSeason(lat, month)).toBe(season);
});

test('shows a spinner until the location arrives, then the season', () => {
    const { container } = render(<App />);
    expect(screen.getByRole('status')).toHaveTextContent('Please accept the location request');

    act(() => succeed({ coords: { latitude: 42 } } as GeolocationPosition));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(container.querySelector('.season-display')).toHaveClass(
        getSeason(42, new Date().getMonth()),
    );
});

test('shows the error when the location is denied', () => {
    render(<App />);
    act(() => fail({ message: 'User denied Geolocation' } as GeolocationPositionError));
    expect(screen.getByRole('alert')).toHaveTextContent('Error: User denied Geolocation');
});
