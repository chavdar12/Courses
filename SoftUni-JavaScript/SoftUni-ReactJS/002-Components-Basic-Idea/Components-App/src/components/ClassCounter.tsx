import {Component} from 'react';

export default class ClassCounter extends Component<object, {count: number}> {
    state = {count: 0};

    // Arrow property keeps `this` bound without .bind in the constructor
    updateCount = () => this.setState(prev => ({count: prev.count + 1}));

    render() {
        return <button onClick={this.updateCount}>Clicked {this.state.count} times</button>;
    }
}
