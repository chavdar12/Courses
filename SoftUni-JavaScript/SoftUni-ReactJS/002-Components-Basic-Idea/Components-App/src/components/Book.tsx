import {Component, type ReactNode} from 'react';

type BookProps = {title: string; author: string; price: number; children?: ReactNode};

export function Book({title, author, price, children}: BookProps) {
    return (
        <li className="book">
            <div>{title}</div>
            <div>{author}</div>
            <div>{price}</div>
            {children && <div>{children}</div>}
        </li>
    );
}

/** The same component written as a class. */
export class ClassBook extends Component<BookProps> {
    render() {
        const {title, author, price, children} = this.props;
        return (
            <li className="book">
                <div>{title}</div>
                <div>{author}</div>
                <div>{price}</div>
                {children && <div>{children}</div>}
            </li>
        );
    }
}
