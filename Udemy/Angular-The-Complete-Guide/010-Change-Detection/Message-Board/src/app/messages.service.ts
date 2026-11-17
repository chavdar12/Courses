import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  private readonly messages = new BehaviorSubject<string[]>([]);
  // observable (not a signal) on purpose: OnPush components pick it up through the async pipe
  readonly messages$ = this.messages.asObservable();

  add(message: string) {
    this.messages.next([...this.messages.value, message]);
  }
}
