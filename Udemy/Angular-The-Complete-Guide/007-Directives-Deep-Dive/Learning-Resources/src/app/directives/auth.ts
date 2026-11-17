import { Directive, TemplateRef, ViewContainerRef, effect, inject, input } from '@angular/core';
import { AuthService, Role } from '../auth.service';

// structural directive: *appAuth="'admin'" renders its template only for that role
@Directive({ selector: '[appAuth]' })
export class Auth {
  readonly role = input.required<Role>({ alias: 'appAuth' });
  private readonly auth = inject(AuthService);
  private readonly template = inject(TemplateRef);
  private readonly container = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      this.container.clear();
      if (this.auth.role() === this.role()) this.container.createEmbeddedView(this.template);
    });
  }
}
