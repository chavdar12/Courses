const BASE_URL = 'http://localhost:3030/jsonstore/cookbook';
const main = document.querySelector('main');

loadRecipes();

async function getJson(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }
    return res.json();
}

async function loadRecipes() {
    try {
        const recipes = Object.values(await getJson(`${BASE_URL}/recipes`));
        main.replaceChildren(...recipes.map(createPreview));
    } catch (err) {
        main.replaceChildren(el('p', { style: 'color: white' }, `Error: ${err.message}`));
    }
}

function createPreview(recipe) {
    const preview = el(
        'article',
        { className: 'preview' },
        el('div', { className: 'title' }, el('h2', {}, recipe.name)),
        el('div', { className: 'small' }, el('img', { src: recipe.img })),
    );
    let details;

    preview.addEventListener('click', async () => {
        details ??= createDetails(await getJson(`${BASE_URL}/details/${recipe._id}`));
        details.onclick = () => details.replaceWith(preview);
        preview.replaceWith(details);
    });
    return preview;
}

function createDetails(recipe) {
    return el(
        'article',
        {},
        el('h2', {}, recipe.name),
        el(
            'div',
            { className: 'band' },
            el('div', { className: 'thumb' }, el('img', { src: recipe.img })),
            el(
                'div',
                { className: 'ingredients' },
                el('h3', {}, 'Ingredients:'),
                el('ul', {}, ...recipe.ingredients.map((i) => el('li', {}, i))),
            ),
        ),
        el(
            'div',
            { className: 'description' },
            el('h3', {}, 'Preparation:'),
            ...recipe.steps.map((s) => el('p', {}, s)),
        ),
    );
}

function el(tag, attributes, ...children) {
    const element = document.createElement(tag);
    Object.assign(element, attributes);
    element.append(...children);
    return element;
}
