import { fetchImageUrl } from '../ts/bearData';
import { describe, it, expect } from 'vitest';

describe('fetchImageUrl', () => {
    it('should return undefined when the image URL is not found', async () => {
        const imageUrl = await fetchImageUrl('non-existent-file.jpg');
        expect(imageUrl).toBeUndefined();
    });

    it('should return a valid image URL when the image exists', async () => {
        // Here you can test with an actual existing image from Wikipedia
        const imageUrl = await fetchImageUrl('Polar_bear.jpg');
        expect(imageUrl).toBeTruthy();
    });
});
