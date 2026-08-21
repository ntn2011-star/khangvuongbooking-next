import { describe, expect, it } from 'vitest';
import { airlineArticles, getArticlesForAirline, getRelatedArticles } from '../app/airline-articles';
import { pages } from '../app/content';

describe('airline article flow', () => {
  it('keeps EVA article assets, FAQs, official sources and service links complete', () => {
    const evaArticles = getArticlesForAirline('eva-air');
    expect(evaArticles.length).toBeGreaterThanOrEqual(4);
    for (const article of evaArticles) {
      expect(article.heroImage).toContain('/manus-storage/');
      expect(article.faqs.length).toBeGreaterThanOrEqual(2);
      expect(article.sources.every((source) => source.url.startsWith('https://www.evaair.com/'))).toBe(true);
      expect(article.serviceSlugs.every((slug) => Boolean(pages[slug]))).toBe(true);
    }
  });

  it('automatically relates content only within the same airline stream', () => {
    const current = airlineArticles.find((article) => article.slug === 'eva-air-hang-ghe-va-cach-chon');
    expect(current).toBeDefined();
    const related = getRelatedArticles(current!);
    expect(related.length).toBeGreaterThan(0);
    expect(related.every((article) => article.airlineSlug === 'eva-air' && article.slug !== current!.slug)).toBe(true);
  });
});
