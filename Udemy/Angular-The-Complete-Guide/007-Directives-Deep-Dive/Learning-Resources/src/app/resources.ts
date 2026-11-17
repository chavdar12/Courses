import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, Role } from './auth.service';
import { Auth } from './directives/auth';
import { Log } from './directives/log';
import { SafeLink } from './directives/safe-link';

@Component({
  selector: 'app-resources',
  imports: [FormsModule, SafeLink, Auth],
  hostDirectives: [Log],
  template: `
    <label>
      Role
      <select [ngModel]="auth.role()" (ngModelChange)="auth.role.set($event)">
        @for (r of roles; track r) {
          <option [value]="r">{{ r }}</option>
        }
      </select>
    </label>
    <ul>
      <li><a href="https://angular.dev" appSafeLink>Angular docs</a></li>
      <li><a href="https://rxjs.dev" appSafeLink="rxjs-section">RxJS docs</a></li>
    </ul>
    <p *appAuth="'user'" class="user">Welcome back! Your saved resources are below.</p>
    <p *appAuth="'admin'" class="admin">Admin: you can edit this list.</p>
  `,
})
export class Resources {
  protected readonly auth = inject(AuthService);
  readonly roles: Role[] = ['guest', 'user', 'admin'];
}
