export default function Link({href, title}: {href: string; title: string}) {
    return (
        <div className="listItem">
            <a href={href}>{title}</a>
        </div>
    );
}
