import { html, nothing } from 'lit-html';
import { deleteCar, getCar } from '../api.js';

export async function detailsPage(ctx) {
    const car = await getCar(ctx.params.id);
    ctx.render(html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info listing-details">
        <img src=${car.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>
        <p class="description-para">${car.description}</p>
        ${
            ctx.user?.id === car._ownerId
                ? html`
        <div class="listings-buttons button-list">
            <a href="/edit/${car._id}" class="button-list">Edit</a>
            <a href="javascript:void(0)" class="button-list" @click=${onDelete}>Delete</a>
        </div>`
                : nothing
        }
    </div>
</section>`);

    async function onDelete() {
        if (confirm(`Delete ${car.brand} ${car.model}?`)) {
            await deleteCar(car._id);
            ctx.page.redirect('/catalog');
        }
    }
}
