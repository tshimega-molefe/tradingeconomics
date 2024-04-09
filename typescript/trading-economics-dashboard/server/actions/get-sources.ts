import { ContentResult, SearchResult } from "@/types/ai-search";
import cheerio from "cheerio";
export async function getSources(message: string): Promise<SearchResult[]> {
  try {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.search.brave.com/res/v1/web/search?q=${encodedMessage}&count=10`; // if you want to add pagination, edit this to accept a dynamic count
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip",
        "X-Subscription-Token": process.env.BRAVE_SEARCH_API_KEY as string,
      },
    });
    if (!response.ok) {
      throw new Error(
        `HTTP Error! Failed to fetch search results: ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data.web || !data.web.results) {
      throw new Error("Invalid API response format");
    }

    const searchResult = data.web.results.map(
      (result: any): SearchResult => ({
        title: result.title,
        link: result.url,
        snippet: result.description,
        favicon: result.profile.img,
      })
    );
    return searchResult;
  } catch (error) {
    console.error(`Error fetching search results...`, error);
    throw error;
  }
}

export async function generateContentForTopLinks(
  sources: SearchResult[]
): Promise<ContentResult[]> {
  async function fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeout = 800
  ): Promise<Response> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      if (error) {
        console.log(`Skipping`, url);
      }
      throw error;
    }
  }
  function extractMainContent(html: string): string {
    try {
      const $ = cheerio.load(html);
      $("script, style, head, nav, footer, iframe, img").remove();
      return $("body").text().replace(/\s+/g, " ").trim();
    } catch (error) {
      console.error(`Error extracting the main content of the URL...`, error);
      throw error;
    }
  }
  const promises = sources.map(
    async (source): Promise<ContentResult | null> => {
      try {
        const response = await fetchWithTimeout(source.link, {}, 800);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${source.link}. Status: ${response.status}`
          );
        }
        const html = await response.text();
        const mainContent = extractMainContent(html);
        return { ...source, html: mainContent };
      } catch (error) {
        console.error(`Error processing ${source.link}:`, error);
        return null;
      }
    }
  );
  try {
    const searchResults = await Promise.all(promises);
    return searchResults.filter(
      (source): source is ContentResult => source !== null
    );
  } catch (error) {
    console.error(
      `Error fetching and generating content for top links:`,
      error
    );
    throw error;
  }
}
