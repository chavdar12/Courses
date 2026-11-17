import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { NewTask } from './tasks/new-task';

describe('routing', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(
          routes,
          withComponentInputBinding(),
          withRouterConfig({ paramsInheritanceStrategy: 'always' }),
        ),
      ],
    });
    harness = await RouterTestingHarness.create();
  });

  const text = () => harness.routeNativeElement?.textContent ?? '';

  it('redirects a user to their tasks, sorted by the order query param', async () => {
    await harness.navigateByUrl('/users/u1');
    expect(TestBed.inject(Title).getTitle()).toBe('Ana | Team Tasks');
    expect(text()).toContain("Ana's tasks");
    const items = () =>
      [...harness.fixture.nativeElement.querySelectorAll('li')].map((li) => li.textContent);
    expect(items()[0]).toContain('Write the docs');

    await harness.navigateByUrl('/users/u1/tasks?order=asc');
    expect(items()[0]).toContain('Fix the login bug');
  });

  it('sends unknown users and paths to the 404 page', async () => {
    await harness.navigateByUrl('/users/nobody');
    expect(text()).toContain('Page not found.');
    await harness.navigateByUrl('/nowhere');
    expect(text()).toContain('Page not found.');
  });

  it('saves a new task and asks before discarding a filled form', async () => {
    await harness.navigateByUrl('/users/u2/tasks/new');
    const form: NewTask = harness.fixture.debugElement.query(
      By.directive(NewTask),
    ).componentInstance;
    expect(form.userId()).toBe('u2');

    form.title = 'Half done';
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false);
    await harness.navigateByUrl('/');
    expect(confirm).toHaveBeenCalled();
    expect(harness.fixture.debugElement.query(By.directive(NewTask))).not.toBeNull();

    form.dueDate = '2026-12-31';
    await form.save();
    harness.detectChanges();
    expect(harness.fixture.nativeElement.textContent).toContain('Half done');
  });
});
