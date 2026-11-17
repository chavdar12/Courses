import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MessagesService } from './messages.service';

@Component({
  selector: 'app-new-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input #text placeholder="Message" />
    <button (click)="send(text.value); text.value = ''">Send</button>
    <p class="count">Sent: {{ sent() }}</p>
  `,
})
export class NewMessage {
  private readonly service = inject(MessagesService);
  readonly sent = signal(0);

  send(text: string) {
    const message = text.trim();
    if (!message) return;
    this.service.add(message);
    this.sent.update((n) => n + 1);
  }
}
