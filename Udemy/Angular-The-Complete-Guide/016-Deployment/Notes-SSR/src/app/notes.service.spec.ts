import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NotesService } from './notes.service';

describe('NotesService', () => {
  beforeEach(() => localStorage.clear());

  it('stores trimmed notes in the browser and ignores blanks', () => {
    const notes = TestBed.inject(NotesService);
    notes.add('  Buy milk ');
    notes.add('   ');
    expect(notes.all().map((n) => n.text)).toEqual(['Buy milk']);
    expect(JSON.parse(localStorage.getItem('notes')!)).toHaveLength(1);
    expect(notes.get(notes.all()[0].id)?.text).toBe('Buy milk');
  });

  it('never touches localStorage on the server', () => {
    localStorage.setItem('notes', JSON.stringify([{ id: '1', text: 'x' }]));
    TestBed.configureTestingModule({ providers: [{ provide: PLATFORM_ID, useValue: 'server' }] });
    const getItem = vi.spyOn(Storage.prototype, 'getItem');
    const setItem = vi.spyOn(Storage.prototype, 'setItem');
    const notes = TestBed.inject(NotesService);
    notes.add('server note');
    expect(notes.all()).toHaveLength(1);
    expect(getItem).not.toHaveBeenCalled();
    expect(setItem).not.toHaveBeenCalled();
  });

  it('starts empty on corrupt storage', () => {
    localStorage.setItem('notes', '{bad');
    expect(TestBed.inject(NotesService).all()).toEqual([]);
  });
});
