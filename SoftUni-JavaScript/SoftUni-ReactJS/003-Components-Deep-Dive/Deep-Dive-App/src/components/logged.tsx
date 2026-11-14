import {useEffect, type ComponentType} from 'react';

/** HOC: same component, plus a console line when it mounts. */
export default function logged<P extends object>(Wrapped: ComponentType<P>) {
    const name = Wrapped.displayName ?? Wrapped.name;
    function Logged(props: P) {
        useEffect(() => console.log(`${name} mounted`), []);
        return <Wrapped {...props}/>;
    }
    Logged.displayName = `Logged(${name})`;
    return Logged;
}
