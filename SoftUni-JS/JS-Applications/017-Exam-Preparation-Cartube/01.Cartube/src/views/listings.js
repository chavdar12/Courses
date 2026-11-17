import { html } from 'lit-html';
import { getCars, getMyCars, searchByYear } from '../api.js';

const carTemplate = (car) => html`
<div class="listing">
    <div class="preview"><img src=${car.imageUrl}></div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

const listTemplate = (cars, empty) => html`
<div class="listings">
    ${cars.length ? cars.map(carTemplate) : html`<p class="no-cars">${empty}</p>`}
</div>`;

export async function catalogPage(ctx) {
    const cars = await getCars();
    ctx.render(html`
<section id="car-listings">
    <h1>Car Listings</h1>
    ${listTemplate(cars, 'No cars in database.')}
</section>`);
}

export async function myListingsPage(ctx) {
    if (!ctx.user) {
        return ctx.page.redirect('/login');
    }
    const cars = await getMyCars(ctx.user.id);
    ctx.render(html`
<section id="my-listings">
    <h1>My car listings</h1>
    ${listTemplate(cars, "You haven't listed any cars yet.")}
</section>`);
}

export async function searchPage(ctx) {
    const year = new URLSearchParams(ctx.querystring).get('query')?.trim() ?? '';
    const cars = year ? await searchByYear(year) : null;
    ctx.render(html`
<section id="search-cars">
    <h1>Filter by year</h1>
    <div class="container">
        <form @submit=${onSearch}>
            <input id="search-input" type="text" name="search" placeholder="Enter desired production year" .value=${year}>
            <input class="button-list" type="submit" value="Search">
        </form>
    </div>
    <h2>Results:</h2>
    ${cars ? listTemplate(cars, 'No results.') : ''}
</section>`);

    function onSearch(e) {
        e.preventDefault();
        const query = new FormData(e.target).get('search').trim();
        if (query) {
            ctx.page.show(`/search?query=${encodeURIComponent(query)}`);
        }
    }
}
