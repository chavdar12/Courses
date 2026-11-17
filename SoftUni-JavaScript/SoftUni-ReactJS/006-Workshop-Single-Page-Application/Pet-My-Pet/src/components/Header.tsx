import { Link, useNavigate } from 'react-router';
import { logout } from '../api';
import { useAuth } from '../auth';

export default function Header() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const onLogout = async () => {
        try {
            await logout();
        } finally {
            // the session is gone either way: an expired token can't log out
            setUser(null);
            navigate('/');
        }
    };

    return (
        <header>
            <nav>
                <Link to="/">Dashboard</Link>
                {user ? (
                    <>
                        <Link to="/my-pets">My Pets</Link>
                        <Link to="/create">Add Pet</Link>
                        <span>Welcome, {user.email}</span>
                        <button className="link" onClick={onLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
