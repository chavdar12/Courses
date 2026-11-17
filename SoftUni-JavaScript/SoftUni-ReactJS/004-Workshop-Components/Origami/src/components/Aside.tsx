import Link from './Link';
import { links } from './links';

export default function Aside() {
    return (
        <aside className="Aside">
            <nav>
                {links.map((l) => (
                    <Link key={l.href} {...l} />
                ))}
            </nav>
        </aside>
    );
}
