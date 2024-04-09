"use server";

import { config } from "@/config/ai";
import { openai } from "@/lib/utils/ai";
import { SearchResult } from "@/types/ai-search";

// 9. Generate follow-up questions using OpenAI API
export const relevantQuestions = async (
  sources: SearchResult[]
): Promise<any> => {
  return await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
          You are a Question generator who generates an array of 3 follow-up questions about the user's financial security preference, in JSON format.
          The JSON schema should include:
          {
            "original": "The original search query or context",
            "followUp": [
              "Question 1",
              "Question 2", 
              "Question 3"
            ]
          }
          `,
      },
      {
        role: "user",
        content: `Generate follow-up questions based on the top results from a similarity search: ${JSON.stringify(
          sources
        )}. The original search query is: "The original search query".`,
      },
    ],
    model: config.inferenceModel,
    response_format: { type: "json_object" },
  });
};
