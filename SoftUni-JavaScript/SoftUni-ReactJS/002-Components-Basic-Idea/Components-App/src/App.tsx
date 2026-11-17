import BookList from './components/BookList';
import ClassCounter from './components/ClassCounter';
import ClickCounter from './components/ClickCounter';
import Greeting from './components/Greeting';
import Input from './components/Input';

export default function App() {
    return (
        <main>
            <h2>Props</h2>
            <BookList />
            <h2>State</h2>
            <ClassCounter />
            <Input />
            <h2>Events</h2>
            <ClickCounter />
            <h2>Conditional rendering</h2>
            <Greeting isLoggedIn={false} />
            <Greeting isLoggedIn />
        </main>
    );
}
