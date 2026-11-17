export type Todo = { id: number; text: string; done: boolean };

export type Action =
    { type: 'add'; text: string } | { type: 'toggle'; id: number } | { type: 'remove'; id: number };

export function todoReducer(todos: readonly Todo[], action: Action): Todo[] {
    switch (action.type) {
        case 'add':
            return [
                ...todos,
                { id: Math.max(0, ...todos.map((t) => t.id)) + 1, text: action.text, done: false },
            ];
        case 'toggle':
            return todos.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t));
        case 'remove':
            return todos.filter((t) => t.id !== action.id);
    }
}
