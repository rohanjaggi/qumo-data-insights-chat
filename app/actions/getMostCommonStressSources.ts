"use server";

import { responses } from "@/app/data/responses";

export default async function getMostCommonStressSources() {
  const stressCounts: Record<string, number> = {};

  responses.forEach((response) => {
    const sources = response["What are the main sources of academic stress you experience as a university student?"];
    if (sources) {
      const normalizedSources = sources.toLowerCase().trim(); 
      stressCounts[normalizedSources] = (stressCounts[normalizedSources] || 0) + 1;
    }
  });

  const sortedStressSources = Object.entries(stressCounts).sort((a, b) => b[1] - a[1]);

  return sortedStressSources.map(([source, count]) => ({ source, count }));
}
