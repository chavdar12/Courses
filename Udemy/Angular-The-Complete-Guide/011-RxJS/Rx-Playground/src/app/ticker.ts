import { Observable } from 'rxjs';

// a hand-written interval: emits 1..count every `ms`, then completes; unsubscribing stops the timer
export function ticker(ms: number, count: number): Observable<number> {
  return new Observable<number>((subscriber) => {
    let n = 0;
    const id = setInterval(() => {
      subscriber.next(++n);
      if (n === count) subscriber.complete();
    }, ms);
    return () => clearInterval(id);
  });
}
