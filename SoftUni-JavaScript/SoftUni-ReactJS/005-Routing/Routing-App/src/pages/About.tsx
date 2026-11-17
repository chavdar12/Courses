import { Link, Outlet } from 'react-router';

export function Contact() {
    return <p>Contact us at contact@example.com</p>;
}

export default function About() {
    return (
        <div>
            <h2>About Page</h2>
            <Link to="contact">Contact</Link>
            {/* nested route renders here */}
            <Outlet />
        </div>
    );
}
