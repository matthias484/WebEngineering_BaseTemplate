import { extractBears } from '../ts/bearData';
import { describe, it, expect } from 'vitest';

describe('extractBears', () => {
  it('should return an empty array for wikitext without bears', async () => {
    const wikitext = '{{Species table/end}}';
    const bears = await extractBears(wikitext);
    expect(bears).toEqual([]);
  });

  it('should extract bear data from valid wikitext', async () => {
    const wikitext = `
      {{Species table/row
      |name=[[Giant panda]]
      |binomial=A. melanoleuca
      |image=Grosser Panda.JPG
      |range=Central China
      }}
      {{Species table/end}}
    `;
    const bears = await extractBears(wikitext);
    expect(bears).toHaveLength(1);
    expect(bears[0].name).toBe('Giant panda');
    expect(bears[0].binomial).toBe('A. melanoleuca');
    expect(bears[0].range).toBe('Central China');
    expect(bears[0].image).toMatch(/^https:\/\/upload\.wikimedia\.org/);
  });
});
