import { Article } from '../models/article.model';
import { ArticleData } from './data';
import { data } from './seed';

describe('ArticleData', () => {
  it('maps every seed entry to an Article', () => {
    const articles = new ArticleData().getData();
    expect(articles.length).toBe(data.length);
    expect(articles.every((a) => a instanceof Article)).toBe(true);
    expect(articles[0].title).toBe(data[0].title);
  });
});
