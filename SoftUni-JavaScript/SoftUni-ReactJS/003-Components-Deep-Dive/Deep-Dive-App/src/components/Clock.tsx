import {Component} from 'react';

/** Mount starts the timer, unmount clears it: the classic lifecycle pair. */
export default class Clock extends Component<object, {seconds: number}> {
    state = {seconds: 0};
    private timer?: ReturnType<typeof setInterval>;

    componentDidMount() {
        this.timer = setInterval(() => this.setState(prev => ({seconds: prev.seconds + 1})), 1000);
    }

    componentDidUpdate(_: object, prev: {seconds: number}) {
        if (prev.seconds !== this.state.seconds) document.title = `Clock: ${this.state.seconds}s`;
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return <p>Mounted for {this.state.seconds}s</p>;
    }
}
