"use server";
export async function getVideos(
  message: string
): Promise<{ imageUrl: string; link: string }[] | null> {
  const url = "https://google.serper.dev/videos";
  const data = JSON.stringify({
    q: message,
  });
  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "X-API-KEY": process.env.SERPER_API_KEY as string,
      "Content-Type": "application/json",
    },
    body: data,
  };
  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status: ${response.status}`
      );
    }
    const responseData = await response.json();
    const validLinks = await Promise.all(
      responseData.videos.map(async (video: any) => {
        const imageUrl = video.imageUrl;
        if (typeof imageUrl === "string") {
          try {
            const imageResponse = await fetch(imageUrl, { method: "HEAD" });
            if (imageResponse.ok) {
              const contentType = imageResponse.headers.get("content-type");
              if (contentType && contentType.startsWith("image/")) {
                return { imageUrl, link: video.link };
              }
            }
          } catch (error) {
            console.error(`Error fetching image link ${imageUrl}:`, error);
          }
        }
        return null;
      })
    );
    const filteredLinks = validLinks.filter(
      (link): link is { imageUrl: string; link: string } => link !== null
    );
    return filteredLinks.slice(0, 9);
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
}
