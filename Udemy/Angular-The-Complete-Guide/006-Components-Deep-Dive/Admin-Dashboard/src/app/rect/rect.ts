import { Component, model } from '@angular/core';

export interface Size {
  width: number;
  height: number;
}

// custom two-way binding with model(): <app-rect [(size)]="size" />
@Component({
  selector: 'app-rect',
  template: `<button (click)="grow()">Grow</button>`,
})
export class Rect {
  readonly size = model.required<Size>();

  grow() {
    this.size.update((s) => ({ width: s.width * 2, height: s.height * 2 }));
  }
}
