"use server";

import { ContentResult } from "@/types/ai-search";
import { Document as DocumentInterface } from "langchain/document";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

export async function generateEmbeddingsFromContent(
  contents: ContentResult[],
  query: string,
  textChunkSize = 1000,
  textChunkOverlap = 400,
  numberOfSimilarityResults = 4
): Promise<DocumentInterface[]> {
  try {
    const embeddings = new OpenAIEmbeddings();
    for (let i = 0; i < contents.length; i++) {
      const content = contents[i];
      if (content.html.length > 0) {
        try {
          const splitText = await new RecursiveCharacterTextSplitter({
            chunkSize: textChunkSize,
            chunkOverlap: textChunkOverlap,
          }).splitText(content.html);

          const vectorStore = await MemoryVectorStore.fromTexts(
            splitText,
            { title: content.title, link: content.link },
            embeddings
          );
          return await vectorStore.similaritySearch(
            query,
            numberOfSimilarityResults
          );
        } catch (error) {
          console.error(`Error processing content for ${content.link}:`, error);
        }
      }
    }
    return [];
  } catch (error) {
    console.error("Error generating embeddings from content:", error);
    throw error;
  }
}
