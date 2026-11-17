import { AuthProvider } from './AuthContext';
import BuggyCounter from './components/BuggyCounter';
import ErrorBoundary from './components/ErrorBoundary';
import LoginBar from './components/LoginBar';
import TodoList from './components/TodoList';

export default function App() {
    return (
        <AuthProvider>
            <main>
                <h2>Context + HOC + useReducer</h2>
                <LoginBar />
                <TodoList />
                <h2>Error boundary</h2>
                <ErrorBoundary>
                    <BuggyCounter />
                </ErrorBoundary>
            </main>
        </AuthProvider>
    );
}
