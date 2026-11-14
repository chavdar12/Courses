import {Link} from 'react-router';

export default function NotFound() {
    return (
        <div>
            <h2>404 - Page not found</h2>
            <Link to="/">Back home</Link>
        </div>
    );
}
