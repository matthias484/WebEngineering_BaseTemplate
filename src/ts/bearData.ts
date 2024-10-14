const baseUrl = "https://en.wikipedia.org/w/api.php";
const title = "List_of_ursids";

const params = {
    action: "parse",
    page: title,
    prop: "wikitext",
    section: 3,
    format: "json",
    origin: "*"
};

// Function to fetch the image URLs based on the file names
const fetchImageUrl = async (fileName) => {
    const imageParams = {
        action: "query",
        titles: `File:${fileName}`,
        prop: "imageinfo",
        iiprop: "url",
        format: "json",
        origin: "*"
    };

    const url = `${baseUrl}?${new URLSearchParams(imageParams).toString()}`;
    const res = await fetch(url);
    const data = await res.json();
    const pages = data.query.pages;
    return Object.values(pages)[0].imageinfo[0].url;
};

// Function to extract bear data from the wikitext, including range
export const extractBears = async (wikitext) => {
    const speciesTables = wikitext.split('{{Species table/end}}');
    const bears = [];

    for (const table of speciesTables) {
        const rows = table.split('{{Species table/row');
        for (const row of rows) {
            const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
            const binomialMatch = row.match(/\|binomial=(.*?)\n/);
            const imageMatch = row.match(/\|image=(.*?)\n/);
            const rangeMatch = row.match(/\|range=(.*?)\n/);  // Extract the range

            if (nameMatch && binomialMatch && imageMatch && rangeMatch) {
                const fileName = imageMatch[1].trim().replace('File:', '');
                const imageUrl = await fetchImageUrl(fileName);

                bears.push({
                    name: nameMatch[1],
                    binomial: binomialMatch[1],
                    image: imageUrl,
                    range: rangeMatch[1].trim()
                });
            }
        }
    }

    // Update the UI after all bears are processed
    const moreBearsSection = document.querySelector('.more_bears');
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
export const getBearData = async () => {
    const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Failed to fetch bear data from Wikipedia');
        }
        const data = await res.json();
        const wikitext = data.parse.wikitext['*'];
        await extractBears(wikitext);
    } catch (error) {
        console.error(error.message);
        const moreBearsSection = document.querySelector('.more_bears');
        moreBearsSection.innerHTML = `<p>Error loading bear data: ${error.message}</p>`;
    }
};
