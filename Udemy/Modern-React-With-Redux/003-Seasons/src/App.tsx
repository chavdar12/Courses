import { useEffect, useState } from 'react';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

export default function App() {
    const [lat, setLat] = useState<number | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => setLat(position.coords.latitude),
            (err) => setError(err.message),
        );
    }, []);

    if (error) return <div role="alert">Error: {error}</div>;
    if (lat !== null) return <SeasonDisplay lat={lat} />;
    return <Spinner message="Please accept the location request" />;
}
