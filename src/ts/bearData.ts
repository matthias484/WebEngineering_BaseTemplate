const baseUrl = 'https://en.wikipedia.org/w/api.php';
const title = 'List_of_ursids';

const params = {
  action: 'parse',
  page: title,
  prop: 'wikitext',
  section: '3',
  format: 'json',
  origin: '*',
};

// Define the structure for the imageinfo object
interface ImageInfo {
  url: string;
}

// Define structure for bear data
interface Bear {
  name: string;
  binomial: string;
  image: string | undefined;
  range: string;
}

// Function to fetch the image URLs based on the file names
const fetchImageUrl = async (fileName: string): Promise<string | undefined> => {
  const cleanFileName = fileName.replace(/^File:/, '').trim();
  if (cleanFileName === '') return undefined;

  const imageParams = {
    action: 'query',
    titles: `File:${cleanFileName}`,
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json',
    origin: '*',
  };

  const url = `${baseUrl}?${new URLSearchParams(imageParams as Record<string, string>).toString()}`;
  const res = await fetch(url);
  const data = (await res.json()) as {
    query: { pages: Record<string, { imageinfo?: ImageInfo[] }> };
  };
  const pages = data.query.pages;
  const firstPage = Object.values(pages)[0];

  return firstPage?.imageinfo?.[0]?.url ?? undefined;
};
// Function to extract bear data from the wikitext, including range
const extractBears = async (wikitext: string): Promise<Bear[]> => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears: Bear[] = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row');
    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)(\||\n)/);
      const rangeMatch = row.match(/\|range=(.*?)\n/);

      if (
        nameMatch !== null &&
        nameMatch[1].trim() !== '' &&
        binomialMatch !== null &&
        binomialMatch[1].trim() !== '' &&
        imageMatch !== null &&
        rangeMatch !== null &&
        rangeMatch[1].trim() !== ''
      ) {
        const fileName = imageMatch[1] != null ? imageMatch[1]?.trim() : '';
        const imageUrl =
          fileName !== '' ? await fetchImageUrl(fileName) : undefined;

        bears.push({
          name: nameMatch[1] != null ? nameMatch[1]?.trim() : 'Unknown Name',
          binomial:
            binomialMatch[1] != null
              ? binomialMatch[1]?.trim()
              : 'Unknown Binomial',
          image: imageUrl,
          range:
            rangeMatch[1] != null ? rangeMatch[1]?.trim() : 'Unknown Range',
        });
      }
    }
  }
  return bears;
};

// Function to update the DOM with bear data
const updateDOMWithBears = (bears: Bear[]): void => {
  const moreBearsSection = document.querySelector('.more_bears');

  moreBearsSection.innerHTML = '';
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

// Function to fetch and display bear data with error handling
export const getBearData = async (): Promise<void> => {
  const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch bear data from Wikipedia');

    const data: { parse: { wikitext: { '*': string } } } = await res.json();
    const wikitext: string = data.parse.wikitext['*'];
    const bears = await extractBears(wikitext);
    updateDOMWithBears(bears);
  } catch (error) {
    const errorMessage =
      error != null ? (error as Error).message : 'Unknown error';
    console.error(errorMessage);

    const moreBearsSection = document.querySelector('.more_bears');
    if (moreBearsSection != null) {
      moreBearsSection.innerHTML = `<p>Error loading bear data: ${errorMessage}</p>`;
    } else {
      console.error('Element ".more_bears" not found');
    }
  }
};
