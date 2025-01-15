import countResponses from "@/app/actions/countResponses";
import getMostCommonStressSources from "@/app/actions/getMostCommonStressSources";
import getLowMentalHealthCount from "@/app/actions/getLowMentalHealthCount";
import getMostFrequentStrategies from "@/app/actions/getMostFrequentStrategies";
import getDatasetSummary from "@/app/actions/getDatasetSummary";
import { google } from "@ai-sdk/google";
import { streamText, tool } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const sanitizedMessages = messages.map((message: any) => {
      return {
        ...message,
        content: message.content.trim().replace(/[^a-zA-Z0-9 ?.,]/g, ""), // To allow only alphanumeric characters, spaces, and punctuation
      };
    });

    const systemPrompt = `
      You are Jacky, an AI assistant for exploring a dataset about university students' academic stress and mental health management. 
      You can analyse and query the dataset to provide insights. Examples of queries include:
      - "How many students rated their mental health below 5?"
      - "What are the most common sources of stress?"
      - "What strategies are frequently used to manage stress?"
      - "How many responses are there in total?"
      - "Give a summary of the data"

      When asked about counts, use the 'count' tool to retrieve the number of responses.
      For other queries, process them using the appropriate tools or direct responses.
      For summaries, use the 'summary' tool to provide an overview of the dataset.
      Only answer queries regarding the dataset provided.
      Respond in clear and concise language but be polite and understanding.
    `;

    const result = streamText({
      model: google("gemini-1.5-flash"),
      system: systemPrompt,
      messages: sanitizedMessages,
      tools: {
        count: tool({
          description: "Get the total count of responses",
          parameters: z.object({
            count: z.number().describe("The total count of responses"),
          }),
          execute: countResponses,
        }),
        commonStressSources: tool({
          description: "Find the most common sources of academic stress reported by students",
          parameters: z.object({
            sources: z.array(z.string()).describe("A list of the most common stress sources"),
          }),
          execute: getMostCommonStressSources,
        }),
        lowMentalHealthCount: tool({
          description: "Count the number of students who rated their mental health below a certain threshold",
          parameters: z.object({
            threshold: z.number().describe("The threshold for mental health rating"),
            count: z.number().describe("The number of students below the threshold"),
          }),
          execute: async (args) => {
            const result = await getLowMentalHealthCount(args.threshold);
            return { count: result.count, threshold: args.threshold };
          },
        }),
        commonStrategies: tool({
          description: "Find the most frequently used strategies for managing stress",
          parameters: z.object({
            strategies: z.array(z.string()).describe("A list of the most used strategies"),
          }),
          execute: getMostFrequentStrategies,
        }),
        summary: tool({
          description: "Provide a summary of the dataset, including top stress sources, average mental health rating, and common strategies",
          parameters: z.object({
            summary: z.string().describe("A comprehensive summary of the dataset"),
          }),
          execute: getDatasetSummary,
        }),
      },
      maxSteps: 5,
    });

    if (!result) {
      return new Response("I'm sorry, I couldn't process your request. Please try again.", {
        status: 400,
      });
    }

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error processing request:", error);

    // Ensure error is cast to an object with a `message` property
    const errorMessage = (error as { message?: string }).message;

    // Handle invalid queries
    if (errorMessage?.includes("invalid")) {
      return new Response(
        "Invalid query. Please rephrase or ask something else related to the dataset.",
        {
          status: 400,
        }
      );
    }

    return new Response(
      "An unexpected error occurred while processing your request.",
      {
        status: 500,
      }
    );
  }
}