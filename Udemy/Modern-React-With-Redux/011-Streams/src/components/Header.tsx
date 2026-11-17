import { useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { signIn, signOut, useUserId } from '../store';

export const DEMO_USER = 'demo-user';

export default function Header() {
    const userId = useUserId();
    const dispatch = useDispatch();
    return (
        <header>
            <Link to="/">Streamy</Link>
            {userId ? (
                <button onClick={() => dispatch(signOut())}>Sign out</button>
            ) : (
                <button onClick={() => dispatch(signIn(DEMO_USER))}>Sign in</button>
            )}
        </header>
    );
}
