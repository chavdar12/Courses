import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MessagesService } from './messages.service';

@Component({
  selector: 'app-messages-list',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul>
      @for (message of service.messages$ | async; track $index) {
        <li>{{ message }}</li>
      }
    </ul>
  `,
})
export class MessagesList {
  protected readonly service = inject(MessagesService);
}
