import { Component } from 'react';
import { getUser, type GithubProfile } from '../services/github';

type State = { user?: GithubProfile; error?: string };

export default class GithubUser extends Component<{ username: string }, State> {
    state: State = {};

    componentDidMount() {
        getUser(this.props.username)
            .then((user) => this.setState({ user }))
            .catch((e: Error) => this.setState({ error: e.message }));
    }

    render() {
        const { user, error } = this.state;
        if (error) return <p role="alert">{error}</p>;
        if (!user) return <p>Loading...</p>;
        return (
            <p>
                {user.name ?? user.login} has {user.public_repos} public repos
            </p>
        );
    }
}
