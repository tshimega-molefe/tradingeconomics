"use server";
export async function GetSearchResults(searchQuery: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/search?q=${searchQuery}`,
      {
        method: "GET",
      }
    );
    const result = await response.json();
    const searchResult = result.data;
    return searchResult;
  } catch (error) {
    return null;
  }
}
