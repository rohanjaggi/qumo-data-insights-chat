"use server";

import { responses } from "@/app/data/responses";

// This function returns the total number of responses
export default async function countResponses() {
  return responses.length;
}
