const baseUrl = 'https://en.wikipedia.org/w/api.php';
const title = 'List_of_ursids';

const params = {
  action: 'parse',
  page: title,
  prop: 'wikitext',
  section: String(3),
  format: 'json',
  origin: '*',
};

// Define the structure for the imageinfo object
interface ImageInfo {
  url: string;
}

// Define the structure for a page in the API response
interface Page {
  imageinfo?: ImageInfo[]; // imageinfo is optional as it may not always be present
}

// Define the structure for the entire API response
interface QueryResponse {
  query: {
    pages: Record<string, Page>;
  };
}
// Function to fetch the image URLs based on the file names
const fetchImageUrl = async (fileName: string): Promise<string | undefined> => {
  const imageParams = {
    action: 'query',
    titles: `File:${fileName}`,
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json',
    origin: '*',
  };

  const url = `${baseUrl}?${new URLSearchParams(imageParams).toString()}`;
  const res = await fetch(url);
  const data: QueryResponse = await res.json(); // Use the defined QueryResponse interface

  // Ensure pages exist before accessing nested properties
  const pages = data.query.pages;
  const firstPage = Object.values(pages)[0]; // Extract the first page

  // Check if imageinfo exists before accessing its properties
  if (firstPage && firstPage.imageinfo && firstPage.imageinfo[0]) {
    return firstPage.imageinfo[0].url;
  }

  // Return undefined if no valid image URL is found
  console.warn('No image URL found for file:', fileName);
  return undefined;
};

// Function to extract bear data from the wikitext, including range
export const extractBears = async (wikitext: string): Promise<void> => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears: Array<{
    name: string;
    binomial: string;
    image: string | undefined;
    range: string;
  }> = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row');
    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=(.*?)\n/); // Extract the range

      if (nameMatch && binomialMatch && imageMatch && rangeMatch) {
        const fileName = imageMatch[1]?.trim().replace('File:', '');
        const imageUrl = await fetchImageUrl(fileName);

        bears.push({
          name: nameMatch[1],
          binomial: binomialMatch[1],
          image: imageUrl,
          range: rangeMatch[1].trim(),
        });
      }
    }
  }

  // Update the UI after all bears are processed
  const moreBearsSection = document.querySelector(
    '.more_bears'
  ) as HTMLElement | null;

  if (!moreBearsSection) {
    console.error('Element ".more_bears" not found');
    return;
  }

  bears.forEach((bear) => {
    moreBearsSection.innerHTML += `
      <div>
        <h3>${bear.name} (${bear.binomial})</h3>
        <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
        <p><strong>Range:</strong> ${bear.range}</p>
      </div>
    `;
  });
};

// Function to fetch bear data with error handling
export const getBearData = async (): Promise<void> => {
  const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch bear data from Wikipedia');
    }
    const data = await res.json();
    const wikitext = data.parse.wikitext['*'];
    await extractBears(wikitext);
  } catch (error: any) {
    // Use `any` to safely access `error.message`
    console.error(error.message || 'Unknown error');

    const moreBearsSection = document.querySelector(
      '.more_bears'
    ) as HTMLElement | null;

    if (moreBearsSection) {
      moreBearsSection.innerHTML = `<p>Error loading bear data: ${error.message || 'Unknown error occurred'}</p>`;
    } else {
      console.error('Element ".more_bears" not found');
    }
  }
};
