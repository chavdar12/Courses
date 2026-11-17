import { useEffect, useState, type MouseEvent, type ReactNode } from 'react';

export function navigate(href: string) {
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
}

export function Link({ href, children }: { href: string; children: ReactNode }) {
    function onClick(e: MouseEvent) {
        // let ctrl/cmd-click open a new tab as usual
        if (e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        navigate(href);
    }
    return (
        <a href={href} onClick={onClick}>
            {children}
        </a>
    );
}

export function Route({ path, children }: { path: string; children: ReactNode }) {
    const [current, setCurrent] = useState(window.location.pathname);
    useEffect(() => {
        const update = () => setCurrent(window.location.pathname);
        window.addEventListener('popstate', update);
        return () => window.removeEventListener('popstate', update);
    }, []);
    return current === path ? children : null;
}
