import type {ComponentType} from 'react';
import {useAuth} from '../AuthContext';

/** HOC: renders the wrapped component only for logged-in users and hands it the user name. */
export default function withAuth<P extends object>(Wrapped: ComponentType<P & {user: string}>) {
    return function WithAuth(props: P) {
        const {user} = useAuth();
        return user ? <Wrapped {...props} user={user}/> : <p>Please log in to see this.</p>;
    };
}
