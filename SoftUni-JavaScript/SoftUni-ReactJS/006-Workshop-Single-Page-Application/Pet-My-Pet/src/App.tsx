import { Route, Routes } from 'react-router';
import { AuthProvider } from './auth';
import Header from './components/Header';
import RequireAuth from './components/RequireAuth';
import AuthPage from './pages/AuthPage';
import Create from './pages/Create';
import Dashboard from './pages/Dashboard';
import Details from './pages/Details';
import Edit from './pages/Edit';
import MyPets from './pages/MyPets';

export default function App() {
    return (
        <AuthProvider>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<AuthPage mode="login" />} />
                    <Route path="/register" element={<AuthPage mode="register" />} />
                    <Route path="/details/:id" element={<Details />} />
                    <Route element={<RequireAuth />}>
                        <Route path="/my-pets" element={<MyPets />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/edit/:id" element={<Edit />} />
                    </Route>
                </Routes>
            </main>
        </AuthProvider>
    );
}
