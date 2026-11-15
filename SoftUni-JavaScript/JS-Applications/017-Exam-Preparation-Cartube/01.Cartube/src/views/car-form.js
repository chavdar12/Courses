import { html } from 'lit-html';
import { createCar, getCar, updateCar } from '../api.js';

const FIELDS = ['brand', 'model', 'description', 'year', 'imageUrl', 'price'];

const formTemplate = (title, car, onSubmit) =>
    html` <section id="${title.toLowerCase()}-listing">
        <div class="container">
            <form @submit=${onSubmit}>
                <h1>${title} Car Listing</h1>
                ${FIELDS.map(
                    (f) =>
                        html` <p>${f[0].toUpperCase() + f.slice(1)}</p>
                            <input
                                type="${f === 'year' || f === 'price' ? 'number' : 'text'}"
                                name=${f}
                                .value=${car[f] ?? ''}
                            />`,
                )}
                <hr />
                <input type="submit" class="registerbtn" value="${title} Listing" />
            </form>
        </div>
    </section>`;

/** Returns the car with year and price as numbers, or throws a message for the alert. */
export function readCar(form) {
    const data = Object.fromEntries([...new FormData(form)].map(([k, v]) => [k, v.trim()]));
    if (FIELDS.some((f) => !data[f])) {
        throw new Error('All fields are required!');
    }
    const car = { ...data, year: Number(data.year), price: Number(data.price) };
    if (!(car.year > 0) || !(car.price > 0)) {
        throw new Error('Year and price must be positive numbers!');
    }
    return car;
}

function formPage(title, load, save) {
    return async (ctx) => {
        if (!ctx.user) {
            return ctx.page.redirect('/login');
        }
        ctx.render(formTemplate(title, await load(ctx), onSubmit));

        async function onSubmit(e) {
            e.preventDefault();
            try {
                await save(ctx, readCar(e.target));
            } catch (err) {
                alert(err.message);
            }
        }
    };
}

export const createPage = formPage(
    'Create',
    () => ({}),
    async (ctx, car) => {
        await createCar(car);
        ctx.page.redirect('/catalog');
    },
);

export const editPage = formPage(
    'Edit',
    (ctx) => getCar(ctx.params.id),
    async (ctx, car) => {
        await updateCar(ctx.params.id, car);
        ctx.page.redirect(`/details/${ctx.params.id}`);
    },
);
