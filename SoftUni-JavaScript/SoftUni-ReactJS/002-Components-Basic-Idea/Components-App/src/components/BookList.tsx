import { Book, ClassBook } from './Book';

export default function BookList() {
    return (
        <ul>
            <Book title="IT" author="Stephen King" price={20}>
                <span>Some value here</span>
            </Book>
            <Book title="The Hunger Games" author="Suzanne Collins" price={10} />
            <ClassBook title="Dune" author="Frank Herbert" price={15} />
        </ul>
    );
}
