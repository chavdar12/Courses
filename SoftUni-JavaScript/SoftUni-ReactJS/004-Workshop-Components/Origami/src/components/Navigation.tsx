import Link from './Link';
import { links } from './links';

export default function Navigation() {
    return (
        <header className="Navigation">
            <nav>
                <img src="/origami.svg" alt="Origami logo" width={32} />
                {links.map((l) => (
                    <Link key={l.href} {...l} />
                ))}
            </nav>
        </header>
    );
}
