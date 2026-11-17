export default function Spinner({ message = 'Loading...' }: { message?: string }) {
    return <div role="status">{message}</div>;
}
