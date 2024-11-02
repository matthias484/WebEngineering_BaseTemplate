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
  const cleanFileName = fileName.replace(/^File:/, '').trim(); // Remove "File:" prefix
  console.log(`Fetching image URL for file: ${cleanFileName}`); // Debug log
  const imageParams = {
    action: 'query',
    titles: `File:${cleanFileName}`,
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json',
    origin: '*',
  };

  const url = `${baseUrl}?${new URLSearchParams(imageParams).toString()}`;
  const res = await fetch(url);
  const data: QueryResponse = await res.json();

  // Ensure pages exist before accessing nested properties
  const pages = data.query.pages;
  const firstPage = Object.values(pages)[0];

  if (firstPage?.imageinfo?.[0]?.url) {
    return firstPage.imageinfo[0].url;
  }

  console.warn('No image URL found for file:', fileName);
  return undefined;
};

// Function to extract bear data from the wikitext, including range
const extractBears = async (wikitext: string): Promise<void> => {
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
      const imageMatch = row.match(/\|image=(.*?)(\||\n)/); // Extract the image file name
      const rangeMatch = row.match(/\|range=(.*?)\n/); // Extract the range

      if (
        nameMatch != null &&
        binomialMatch != null &&
        imageMatch != null &&
        rangeMatch != null
      ) {
        const fileName = imageMatch[1]?.trim() ?? '';
        const imageUrl =
          fileName !== '' ? await fetchImageUrl(fileName) : undefined;

        bears.push({
          name: nameMatch[1]?.trim() ?? 'Unknown Name',
          binomial: binomialMatch[1]?.trim() ?? 'Unknown Binomial',
          image: imageUrl,
          range: rangeMatch[1]?.trim() ?? 'Unknown Range',
        });
      }
    }
  }

  const moreBearsSection = document.querySelector('.more_bears');
  if (moreBearsSection == null) {
    console.error('Element ".more_bears" not found');
    return;
  }

  moreBearsSection.innerHTML = ''; // Clear previous content
  bears.forEach((bear) => {
    moreBearsSection.innerHTML += `
      <div>
        <h3>${bear.name} (${bear.binomial})</h3>
        <img src="${bear.image ?? ''}" alt="${bear.name}" style="width:200px; height:auto;">
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

    const data: { parse: { wikitext: { '*': string } } } = await res.json();
    const wikitext: string = data.parse.wikitext['*'];
    await extractBears(wikitext);
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage = error.message || 'Unknown error';
      console.error(errorMessage);

      const moreBearsSection = document.querySelector('.more_bears');
      if (moreBearsSection != null) {
        moreBearsSection.innerHTML = `<p>Error loading bear data: ${errorMessage}</p>`;
      } else {
        console.error('Element ".more_bears" not found');
      }
    }
  }
};
