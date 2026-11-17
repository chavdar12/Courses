import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OfferPreview } from './offer-preview';

@Component({
  selector: 'app-catalog',
  imports: [OfferPreview, RouterLink],
  template: `
    <h2>Catalog</h2>
    <a routerLink="/admin">Admin area</a>
    <!-- the preview's code is split into its own chunk and loaded on first interaction -->
    @defer (on interaction; prefetch on idle) {
      <app-offer-preview />
    } @placeholder {
      <button class="show-offer">Show this week's offer</button>
    } @loading (minimum 300ms) {
      <p>Loading offer…</p>
    }
  `,
})
export class Catalog {}
