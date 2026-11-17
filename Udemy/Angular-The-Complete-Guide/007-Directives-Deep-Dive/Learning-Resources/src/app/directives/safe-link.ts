import { Directive, ElementRef, inject, input } from '@angular/core';

// attribute directive: asks before leaving the site and tags the outgoing URL with ?from=
@Directive({
  selector: 'a[appSafeLink]',
  host: { '(click)': 'onClick($event)' },
})
export class SafeLink {
  readonly from = input('learning-resources', { alias: 'appSafeLink' });
  private readonly host = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  onClick(event: MouseEvent) {
    if (!window.confirm('Do you want to leave this app?')) {
      event.preventDefault();
      return;
    }
    const url = new URL(this.host.nativeElement.href);
    url.searchParams.set('from', this.from());
    this.host.nativeElement.href = url.toString();
  }
}
