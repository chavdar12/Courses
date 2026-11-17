import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Counter } from './counter';
import { MessagesList } from './messages-list';
import { NewMessage } from './new-message';

@Component({
  selector: 'app-root',
  imports: [Counter, NewMessage, MessagesList],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Message Board</h1>
    <app-counter />
    <app-new-message />
    <app-messages-list />
  `,
})
export class App {}
