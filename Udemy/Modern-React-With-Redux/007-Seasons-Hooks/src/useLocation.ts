import { useEffect, useState } from 'react';

export default function useLocation() {
    const [lat, setLat] = useState<number | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => setLat(position.coords.latitude),
            (err) => setError(err.message),
        );
    }, []);

    return { lat, error };
}
