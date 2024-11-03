import { describe, it, expect } from 'vitest';
import { fetchImageUrl } from '../ts/bearData'; // Adjust path as needed

describe('fetchImageUrl', () => {
  it('should return undefined when the image URL is not found', async () => {
    const result = await fetchImageUrl('NonExistentImage.jpg');
    expect(result).toBeUndefined();
  });

  it('should return a valid image URL when the image exists', async () => {
    const result = await fetchImageUrl('Grosser Panda.JPG');
    expect(result).toMatch(/^https:\/\/upload\.wikimedia\.org/);
  });
});
