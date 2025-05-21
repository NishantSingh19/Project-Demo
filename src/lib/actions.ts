'use server';

import { generateResortRecommendations, type GenerateResortRecommendationsInput, type GenerateResortRecommendationsOutput } from '@/ai/flows/generate-resort-recommendations';
import { z } from 'zod';

const RecommendationRequestSchema = z.object({
  occasion: z.string().min(3, "Occasion must be at least 3 characters long."),
  preferences: z.string().min(3, "Preferences must be at least 3 characters long."),
  budget: z.string().min(3, "Budget must be specified."),
});

export interface ActionResponse {
  success: boolean;
  data?: GenerateResortRecommendationsOutput;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

export async function handleGenerateRecommendations(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  const rawFormData = {
    occasion: formData.get('occasion') as string,
    preferences: formData.get('preferences') as string,
    budget: formData.get('budget') as string,
  };

  const validationResult = RecommendationRequestSchema.safeParse(rawFormData);

  if (!validationResult.success) {
    return {
      success: false,
      error: "Invalid input.",
      fieldErrors: validationResult.error.flatten().fieldErrors,
    };
  }

  const input: GenerateResortRecommendationsInput = validationResult.data;

  try {
    const recommendations = await generateResortRecommendations(input);
    return { success: true, data: recommendations };
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return { success: false, error: "Failed to generate recommendations. Please try again later." };
  }
}
