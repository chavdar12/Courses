import { lazy, Suspense, useState } from 'react';
import { Navigate, NavLink, Route, Routes } from 'react-router';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import About, { Contact } from './pages/About';
import User from './pages/User';
import NotFound from './pages/NotFound';

// Route-based code splitting: Dashboard ships in its own chunk
const Dashboard = lazy(() => import('./pages/Dashboard'));

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <>
            <h1>React Router Tutorial</h1>
            <nav>
                {/* NavLink adds the "active" class to the current route */}
                <NavLink to="/" end>
                    Home
                </NavLink>
                <NavLink to="/catalog/electronics/XYZ5538">Catalog</NavLink>
                <NavLink to="/about">About</NavLink>
                <button onClick={() => setLoggedIn((l) => !l)}>
                    {loggedIn ? 'Logout' : 'Login'}
                </button>
            </nav>
            <Suspense fallback={<p>Loading...</p>}>
                <Routes>
                    <Route path="/" element={loggedIn ? <Navigate to="/dashboard" /> : <Home />} />
                    <Route
                        path="/dashboard"
                        element={loggedIn ? <Dashboard /> : <Navigate to="/" />}
                    />
                    <Route path="/catalog/:category/:userId" element={<Catalog />} />
                    <Route path="/about" element={<About />}>
                        <Route path="contact" element={<Contact />} />
                    </Route>
                    <Route path="/users/:user" element={<User />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </>
    );
}
