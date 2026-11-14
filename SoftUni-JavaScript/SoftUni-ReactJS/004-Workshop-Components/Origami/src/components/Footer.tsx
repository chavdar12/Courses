import Link from './Link';
import {links} from './links';

export default function Footer() {
    return (
        <footer className="Footer">
            <nav>
                <p>Software University 2026</p>
                {links.map(l => <Link key={l.href} {...l}/>)}
            </nav>
        </footer>
    );
}
