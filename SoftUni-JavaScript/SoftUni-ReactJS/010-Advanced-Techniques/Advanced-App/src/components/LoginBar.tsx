import {useAuth} from '../AuthContext';

export default function LoginBar() {
    const {user, login, logout} = useAuth();
    return user
        ? <p>Hello, {user} <button onClick={logout}>Logout</button></p>
        : <button onClick={() => login('Pesho')}>Login as Pesho</button>;
}
