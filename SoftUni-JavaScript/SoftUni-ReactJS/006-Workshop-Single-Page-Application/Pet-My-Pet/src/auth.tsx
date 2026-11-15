import { createContext, use, useState, type ReactNode } from 'react';
import { session, type User } from './api';

type Auth = { user: User | null; setUser: (user: User | null) => void };

const AuthContext = createContext<Auth | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUserState] = useState(session.get);
    const setUser = (next: User | null) => {
        if (next) session.set(next);
        else session.clear();
        setUserState(next);
    };
    return <AuthContext value={{ user, setUser }}>{children}</AuthContext>;
}

export function useAuth() {
    const auth = use(AuthContext);
    if (!auth) throw new Error('useAuth must be used inside AuthProvider');
    return auth;
}
