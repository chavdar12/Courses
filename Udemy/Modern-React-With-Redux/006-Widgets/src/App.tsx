import { useState } from 'react';
import Accordion, { type Item } from './components/Accordion';
import Dropdown, { type Option } from './components/Dropdown';
import { Link, Route } from './components/Router';
import Search from './components/Search';
import Translate from './components/Translate';

export const items: Item[] = [
    {
        title: 'What is React?',
        content: 'A library for building user interfaces out of components.',
    },
    {
        title: 'Why use React?',
        content: 'Components keep UI and logic small, reusable and testable.',
    },
    {
        title: 'How do you use React?',
        content: 'You write components and compose them into an app.',
    },
];

export const colors: Option[] = [
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green' },
    { label: 'Blue', value: 'blue' },
];

export default function App() {
    const [color, setColor] = useState(colors[0]);
    return (
        <main>
            <nav>
                <Link href="/">Accordion</Link> <Link href="/search">Search</Link>{' '}
                <Link href="/dropdown">Dropdown</Link> <Link href="/translate">Translate</Link>
            </nav>
            <Route path="/">
                <Accordion items={items} />
            </Route>
            <Route path="/search">
                <Search />
            </Route>
            <Route path="/dropdown">
                <Dropdown
                    label="Select a color"
                    options={colors}
                    selected={color}
                    onChange={setColor}
                />
                <p style={{ color: color.value }}>This text is {color.value}.</p>
            </Route>
            <Route path="/translate">
                <Translate />
            </Route>
        </main>
    );
}
