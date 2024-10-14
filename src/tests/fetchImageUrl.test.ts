import { describe, it, expect, vi } from 'vitest';
import { fetchImageUrl } from '../ts/bearData'; // Adjust the path based on your project structure

describe('fetchImageUrl', () => {
    it('should return undefined when no image URL is found', async () => {
        // Mock the fetch response to return an empty result
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ query: { pages: {} } }),
            })
        ) as unknown as typeof fetch;

        const result = await fetchImageUrl('non-existent-file.jpg');
        expect(result).toBeUndefined();

        // Clear the mock after the test
        vi.restoreAllMocks();
    });

    it('should return the image URL when found', async () => {
        // Mock the fetch response to return a valid image URL
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve({
                        query: {
                            pages: {
                                123: { imageinfo: [{ url: 'https://example.com/image.jpg' }] },
                            },
                        },
                    }),
            })
        ) as unknown as typeof fetch;

        const result = await fetchImageUrl('valid-file.jpg');
        expect(result).toBe('https://example.com/image.jpg');

        // Clear the mock after the test
        vi.restoreAllMocks();
    });
});
