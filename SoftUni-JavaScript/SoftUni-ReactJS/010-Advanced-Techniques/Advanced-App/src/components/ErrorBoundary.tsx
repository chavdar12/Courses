import { Component, type ErrorInfo, type ReactNode } from 'react';

type State = { error: Error | null };

/** Catches render errors below it and shows a fallback instead of a blank page. Must be a class. */
export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
    state: State = { error: null };

    static getDerivedStateFromError(error: Error): State {
        return { error };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('ErrorBoundary caught', error, info.componentStack);
    }

    render() {
        if (!this.state.error) return this.props.children;
        return (
            <div role="alert">
                <p>Something went wrong: {this.state.error.message}</p>
                <button onClick={() => this.setState({ error: null })}>Try again</button>
            </div>
        );
    }
}
