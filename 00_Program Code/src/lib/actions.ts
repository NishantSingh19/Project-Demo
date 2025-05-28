
'use server';

import { generateResortRecommendations, type GenerateResortRecommendationsInput, type GenerateResortRecommendationsOutput } from '@/ai/flows/generate-resort-recommendations';
import { generateResortImage, type GenerateResortImageInput, type GenerateResortImageOutput } from '@/ai/flows/generate-resort-image-flow';
import { z } from 'zod';

const RecommendationRequestSchema = z.object({
  occasion: z.string().min(1, "Occasion must be selected."), // Updated min for select
  preferences: z.string().min(3, "Preferences must be at least 3 characters long."),
  budget: z.string().min(1, "Budget must be selected."), // Updated min for select
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
    // It's good practice to avoid sending detailed error messages like error.message to client
    // unless they are specifically crafted for client consumption.
    const errorMessage = error instanceof Error ? error.message : String(error);
    // Mask generic errors for the client.
    // Log the detailed error on the server.
    if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
         return { success: false, error: "The recommendation service is currently busy. Please try again in a moment." };
    }
    return { success: false, error: "Failed to generate recommendations due to a server issue. Please try again later." };
  }
}


export async function generateResortImageAction(input: GenerateResortImageInput): Promise<GenerateResortImageOutput> {
  // The generateResortImage flow now handles its internal errors (like API errors or rate limits)
  // and will return an object with imageDataUri: null in case of failure.
  // The client-side (ResortCard.tsx) is already set up to check if imageDataUri is null
  // and display a fallback if it is. So, we just return the result from the flow.
  return generateResortImage(input);
}
