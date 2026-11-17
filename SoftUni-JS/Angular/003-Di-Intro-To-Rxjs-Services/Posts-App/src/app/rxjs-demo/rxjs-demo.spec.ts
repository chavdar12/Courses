import { TestBed } from '@angular/core/testing';
import { CounterService } from '../services/counter.service';
import { RxjsDemo } from './rxjs-demo';

describe('RxjsDemo', () => {
  function setup() {
    const fixture = TestBed.createComponent(RxjsDemo);
    return {
      fixture,
      demo: fixture.componentInstance,
      output: () => fixture.componentInstance['output'](),
    };
  }

  it('map squares 1..10', () => {
    const { demo, output } = setup();
    demo.runMap();
    expect(output().slice(1)).toEqual(['1', '4', '9', '16', '25', '36', '49', '64', '81', '100']);
  });

  it('filter keeps even numbers', () => {
    const { demo, output } = setup();
    demo.runFilter();
    expect(output().slice(1)).toEqual(['2', '4', '6', '8', '10']);
  });

  it('reduce sums 1..10', () => {
    const { demo, output } = setup();
    demo.runReduce();
    expect(output().slice(1)).toEqual(['55']);
  });

  it('a cold observable runs once per subscriber', () => {
    const { demo, output } = setup();
    demo.runCold();
    expect(output().filter((l) => l.startsWith('tap')).length).toBe(6);
  });

  it('gets its own CounterService instance', () => {
    TestBed.configureTestingModule({ providers: [CounterService] });
    const root = TestBed.inject(CounterService);
    const { fixture } = setup();
    fixture.componentInstance['counter'].increment();
    expect(fixture.componentInstance['counter']).not.toBe(root);
    expect(root.count()).toBe(0);
  });
});
