import countResponses from "@/app/actions/countResponses";
import { google } from "@ai-sdk/google";
import { streamText, tool } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google("gemini-1.5-flash"),
    system: "", // TODO: Add an appropriate system prompt
    messages,
    tools: {
      count: tool({
        description: "Get the total count of responses",
        parameters: z.object({
          count: z.number().describe("The total count of responses"),
        }),
        execute: countResponses,
      }),
    },
  });

  return result.toDataStreamResponse();
}
