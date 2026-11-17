import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';
import useLocation from './useLocation';

export default function App() {
    const { lat, error } = useLocation();

    if (error) return <div role="alert">Error: {error}</div>;
    if (lat !== null) return <SeasonDisplay lat={lat} />;
    return <Spinner message="Please accept the location request" />;
}
