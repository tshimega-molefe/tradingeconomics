"use server";
import { createAI, createStreamableValue } from "ai/rsc";
import { getImages } from "./get-images";
import { generateContentForTopLinks, getSources } from "./get-sources";
import { getVideos } from "./get-videos";
import { generateEmbeddingsFromContent } from "./embeddings";
import { openai } from "@/lib/utils/ai";
import { config } from "@/config/ai";
import { relevantQuestions } from "./get-responses";
async function GenerateSearchResult(userMessage: string): Promise<any> {
  "use server";
  const streamable = createStreamableValue({});
  (async () => {
    const [images, sources, videos] = await Promise.all([
      getImages(userMessage),
      getSources(userMessage),
      getVideos(userMessage),
    ]);
    streamable.update({ searchResults: sources });
    streamable.update({ images: images });
    streamable.update({ videos: videos });
    const html = await generateContentForTopLinks(sources);
    const vectorResults = await generateEmbeddingsFromContent(
      html,
      userMessage
    );
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
          - Here is my query "${userMessage}", respond back with an answer that is finance related, and focused on simplifying the financial understanding of the financial security in question. If you can't find any relevant results, respond with "No relevant results found." `,
        },
        {
          role: "user",
          content: ` - Here are the top results from a similarity search: ${JSON.stringify(
            vectorResults
          )}. `,
        },
      ],
      stream: true,
      model: config.inferenceModel,
    });
    for await (const chunk of chatCompletion) {
      if (chunk.choices[0].delta && chunk.choices[0].finish_reason !== "stop") {
        streamable.update({ llmResponse: chunk.choices[0].delta.content });
      } else if (chunk.choices[0].finish_reason === "stop") {
        streamable.update({ llmResponseEnd: true });
      }
    }
    if (!config.useOllamaInference) {
      const followUp = await relevantQuestions(sources);
      streamable.update({ followUp: followUp });
    }
    streamable.done({ status: "done" });
  })();
  return streamable.value;
}
// 11. Define initial AI and UI states
const initialAIState: {
  role: "user" | "assistant" | "system" | "function";
  content: string;
  id?: string;
  name?: string;
}[] = [];
const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];
// 12. Export the AI instance
export const AI = createAI({
  actions: {
    GenerateSearchResult,
  },
  initialUIState,
  initialAIState,
});
