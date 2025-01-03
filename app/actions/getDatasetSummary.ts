"use server";

import { responses } from "@/app/data/responses";

export default async function getDatasetSummary() {
  const totalResponses = responses.length;

  // Top 3 stress sources
  const stressCounts: Record<string, number> = {};
  responses.forEach((response) => {
    const sources = response["What are the main sources of academic stress you experience as a university student?"];
    if (sources) {
      const normalizedSources = sources.toLowerCase().trim();
      stressCounts[normalizedSources] = (stressCounts[normalizedSources] || 0) + 1;
    }
  });
  const topStressSources = Object.entries(stressCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([source, count]) => ({ source, count }));

  // Average mental health rating
  const totalMentalHealthScores = responses.reduce((acc, response) => {
    const rating = response["On a scale from 1 to 10, how would you rate your overall mental health during the academic year?"];
    return acc + (isNaN(rating) ? 0 : rating);
  }, 0);
  const averageMentalHealthRating = (totalMentalHealthScores / totalResponses).toFixed(1);

  // Most common strategies
  const strategyCounts: Record<string, number> = {};
  responses.forEach((response) => {
    const strategies = response["Which of the following strategies do you use to manage academic stress? (Select all that apply)"];
    if (strategies) {
      strategies.split(", ").forEach((strategy) => {
        const normalizedStrategy = strategy.trim();
        strategyCounts[normalizedStrategy] = (strategyCounts[normalizedStrategy] || 0) + 1;
      });
    }
  });
  const topStrategies = Object.entries(strategyCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([strategy, count]) => ({ strategy, count }));

  return {
    totalResponses,
    topStressSources,
    averageMentalHealthRating: parseFloat(averageMentalHealthRating),
    topStrategies,
  };
}
