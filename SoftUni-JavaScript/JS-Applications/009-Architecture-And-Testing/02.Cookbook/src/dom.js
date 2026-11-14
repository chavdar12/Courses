// DOM rendering: el('a', { href, onclick }, ...children) builds an element tree.
export function el(tag, properties = {}, ...children) {
    const element = document.createElement(tag);
    Object.assign(element, properties);
    element.append(...children.flat());
    return element;
}

export const link = (text, onclick, className = '') => el('a', { href: 'javascript:void(0)', className, onclick }, text);

export function render(main, ...nodes) {
    main.replaceChildren(...nodes.flat());
}
