import { TestBed } from '@angular/core/testing';
import { Article as ArticleModel } from '../models/article.model';
import { Article } from './article';

describe('Article', () => {
  const desc = 'x'.repeat(600);

  function setup() {
    const fixture = TestBed.createComponent(Article);
    fixture.componentRef.setInput('article', new ArticleModel('Title', desc, 'Me', 'img.png'));
    fixture.componentRef.setInput('articleDesc', desc);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const click = (label: string) => {
      [...el.querySelectorAll('button')].find((b) => b.textContent!.trim() === label)!.click();
      fixture.detectChanges();
    };
    return { el, click };
  }

  it('reveals the description 250 symbols per click', () => {
    const { el, click } = setup();
    expect(el.querySelector('.desc')).toBeNull();

    click('Read More');
    expect(el.querySelector('.desc')!.textContent!.trim().length).toBe(250);
  });

  it('swaps Read More for Hide Desc once fully shown, and hides again', () => {
    const { el, click } = setup();
    click('Read More');
    click('Read More');
    click('Read More');
    expect(el.textContent).not.toContain('Read More');

    click('Hide Desc');
    expect(el.querySelector('.desc')).toBeNull();
    expect(el.textContent).toContain('Read More');
  });

  it('toggles the image', () => {
    const { el, click } = setup();
    click('Show Image');
    expect(el.querySelector('img')!.getAttribute('src')).toBe('img.png');

    click('Hide Image');
    expect(el.querySelector('img')).toBeNull();
  });
});
