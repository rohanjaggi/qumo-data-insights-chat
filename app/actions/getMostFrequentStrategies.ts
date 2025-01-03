"use server";

import { responses } from "@/app/data/responses";

export default async function getMostFrequentStrategies() {
  const strategyCounts: Record<string, number> = {};

  responses.forEach((response) => {
    const strategies = response["Which of the following strategies do you use to manage academic stress? (Select all that apply)"];
    if (strategies) {
      strategies.split(",").forEach((strategy: string) => {
        const trimmedStrategy = strategy.trim();
        strategyCounts[trimmedStrategy] = (strategyCounts[trimmedStrategy] || 0) + 1;
      });
    }
  });

  const sortedStrategies = Object.entries(strategyCounts).sort((a, b) => b[1] - a[1]);

  return sortedStrategies.map(([strategy, count]) => ({ strategy, count }));
}
