function UserGreeting() {
    return <h3>Welcome back!</h3>;
}

function GuestGreeting() {
    return <h3>Please sign up.</h3>;
}

export default function Greeting({isLoggedIn}: {isLoggedIn: boolean}) {
    if (isLoggedIn) {
        return <UserGreeting/>;
    }
    return <GuestGreeting/>;
}
