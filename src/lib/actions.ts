
'use server';

import { generateResortRecommendations, type GenerateResortRecommendationsInput, type GenerateResortRecommendationsOutput } from '@/ai/flows/generate-resort-recommendations';
import { generateResortImage, type GenerateResortImageInput, type GenerateResortImageOutput } from '@/ai/flows/generate-resort-image-flow';
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


export async function generateResortImageAction(input: GenerateResortImageInput): Promise<GenerateResortImageOutput> {
  try {
    const result = await generateResortImage(input);
    return result;
  } catch (error) {
    console.error("Error in generateResortImageAction:", error);
    // Re-throw the error so the client can handle it, or return a structured error.
    // For simplicity, re-throwing allows the client's catch block to activate.
    // Consider returning a specific error structure if more granular client handling is needed.
    // e.g., return { imageDataUri: '', error: 'Image generation failed' }
    throw new Error(`Image generation failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}
