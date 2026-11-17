import { TestBed } from '@angular/core/testing';
import SubjectsDemo from './subjects-demo';

describe('SubjectsDemo', () => {
  function run(method: 'subject' | 'behaviorSubject' | 'replaySubject' | 'asyncSubject') {
    const demo = TestBed.createComponent(SubjectsDemo).componentInstance;
    demo[method]();
    return demo['output']().slice(1);
  }

  it('Subject multicasts to both observers', () => {
    expect(run('subject')).toEqual([
      'observerA: 1',
      'observerB: 1',
      'observerA: 2',
      'observerB: 2',
      'observerA: 3',
      'observerB: 3',
    ]);
  });

  it('BehaviorSubject gives a late subscriber the current value', () => {
    expect(run('behaviorSubject')).toEqual([
      'observerA: 0',
      'observerA: 1',
      'observerA: 2',
      'observerB: 2',
      'observerA: 3',
      'observerB: 3',
    ]);
  });

  it('ReplaySubject(2) replays the last two values', () => {
    expect(run('replaySubject')).toEqual([
      'observerA: 1',
      'observerA: 2',
      'observerA: 3',
      'observerB: 2',
      'observerB: 3',
      'observerA: 4',
      'observerB: 4',
    ]);
  });

  it('AsyncSubject emits only the last value on complete', () => {
    expect(run('asyncSubject')).toEqual(['observerA: 5', 'observerB: 5']);
  });
});
