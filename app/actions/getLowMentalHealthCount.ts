"use server";

import { responses } from "@/app/data/responses";

export default async function getLowMentalHealthCount(threshold: number) {
  const lowMentalHealthCount = responses.filter((response) => {
    const rating = response["On a scale from 1 to 10, how would you rate your overall mental health during the academic year?"];
    return rating < threshold;
  }).length;

  return { threshold, count: lowMentalHealthCount };
}
