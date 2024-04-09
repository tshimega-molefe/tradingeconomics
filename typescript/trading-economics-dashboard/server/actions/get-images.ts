"use server";
export async function getImages(
  message: string
): Promise<{ title: string; link: string }[]> {
  try {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.search.brave.com/res/v1/images/search?q=${encodedMessage}&spellcheck=1`; // if you want to add pagination, edit this to accept a dynamic count
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip",
        "X-Subscription-Token": process.env.BRAVE_SEARCH_API_KEY as string,
      },
    });
    if (!response.ok) {
      throw new Error(
        `HTTP Error! Failed to fetch search results: ${response.status}`
      );
    }
    const data = await response.json();
    const validLinks = await Promise.all(
      data.results.map(async (result: any) => {
        const link = result.properties.url;
        if (typeof link === "string") {
          try {
            const imageResponse = await fetch(link, { method: "HEAD" });
            if (imageResponse.ok) {
              const contentType = imageResponse.headers.get("content-type");
              if (contentType && contentType.startsWith("image/")) {
                return {
                  title: result.properties.title,
                  link: link,
                };
              }
            }
          } catch (error) {
            console.error(`Error fetching Image URL ${link}:`, error);
          }
        }
        return null;
      })
    );
    const filteredURLs = validLinks.filter(
      (link): link is { title: string; link: string } => link !== null
    );
    return filteredURLs.slice(0, 9);
  } catch (error) {
    console.error(
      `There was a problem retrieving images for your search request:`,
      error
    );
    throw error;
  }
}
