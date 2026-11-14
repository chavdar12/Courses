import {useReducer, useState, type FormEvent} from 'react';
import {todoReducer} from './todoReducer';
import withAuth from './withAuth';

function TodoList({user}: {user: string}) {
    const [todos, dispatch] = useReducer(todoReducer, []);
    const [text, setText] = useState('');

    const add = (e: FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        dispatch({type: 'add', text: text.trim()});
        setText('');
    };

    return (
        <section>
            <h3>{user}'s todos</h3>
            <form onSubmit={add}>
                <input aria-label="New todo" value={text} onChange={e => setText(e.target.value)}/>
                <button>Add</button>
            </form>
            <ul>
                {todos.map(t => (
                    <li key={t.id}>
                        <label style={{textDecoration: t.done ? 'line-through' : 'none'}}>
                            <input type="checkbox" checked={t.done} onChange={() => dispatch({type: 'toggle', id: t.id})}/>
                            {t.text}
                        </label>
                        <button onClick={() => dispatch({type: 'remove', id: t.id})}>Remove {t.text}</button>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default withAuth(TodoList);
