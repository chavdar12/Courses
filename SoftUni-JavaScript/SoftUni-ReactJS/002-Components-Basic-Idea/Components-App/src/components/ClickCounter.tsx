import {Component} from 'react';

function Button({clicks, clickHandler}: {clicks: number; clickHandler: () => void}) {
    return (
        <button className="counter" onClick={clickHandler}>
            Click me! I'm a counter [{clicks}]
        </button>
    );
}

/** Parent keeps the state, child reports clicks through a callback prop. */
export default class ClickCounter extends Component<object, {clicks: number; rows: number[]}> {
    state = {clicks: 0, rows: [1, 2, 3]};

    clickHandler = () => this.setState(prev => ({clicks: prev.clicks + 1}));

    deleteRow = (id: number) => this.setState(prev => ({rows: prev.rows.filter(r => r !== id)}));

    render() {
        return (
            <div>
                <Button clicks={this.state.clicks} clickHandler={this.clickHandler}/>
                <ul>
                    {this.state.rows.map(id => (
                        <li key={id}>
                            Row {id} <button onClick={() => this.deleteRow(id)}>Delete Row {id}</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
