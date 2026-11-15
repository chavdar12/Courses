import { createContext, use, useState, type ReactNode } from 'react';

type Auth = { user: string | null; login: (name: string) => void; logout: () => void };

const AuthContext = createContext<Auth | null>(null);

/** "Easier context": the provider owns the state, consumers just call useAuth(). */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<string | null>(null);
    return (
        <AuthContext value={{ user, login: setUser, logout: () => setUser(null) }}>
            {children}
        </AuthContext>
    );
}

export function useAuth() {
    const auth = use(AuthContext);
    if (!auth) throw new Error('useAuth must be used inside AuthProvider');
    return auth;
}
