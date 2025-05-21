
'use server';
/**
 * @fileOverview Generates resort-themed images using AI.
 *
 * - generateResortImage - A function that generates an image based on a prompt.
 * - GenerateResortImageInput - The input type for the generateResortImage function.
 * - GenerateResortImageOutput - The return type for the generateResortImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResortImageInputSchema = z.object({
  prompt: z.string().describe('A descriptive prompt for the image to be generated (e.g., "luxurious resort pool at sunset", "modern hotel lobby with ocean view").'),
});
export type GenerateResortImageInput = z.infer<typeof GenerateResortImageInputSchema>;

const GenerateResortImageOutputSchema = z.object({
  imageDataUri: z.string().nullable().describe("The generated image as a data URI, or null if generation failed. Expected format: 'data:image/png;base64,<encoded_data>'."),
});
export type GenerateResortImageOutput = z.infer<typeof GenerateResortImageOutputSchema>;

export async function generateResortImage(input: GenerateResortImageInput): Promise<GenerateResortImageOutput> {
  return generateResortImageFlow(input);
}

const generateResortImageFlow = ai.defineFlow(
  {
    name: 'generateResortImageFlow',
    inputSchema: GenerateResortImageInputSchema,
    outputSchema: GenerateResortImageOutputSchema,
  },
  async (input) => {
    try {
      const {media} = await ai.generate({
        model: 'googleai/gemini-2.0-flash-exp', // IMPORTANT: Use this exact model for image generation
        prompt: input.prompt,
        config: {
          responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE
          // Optional: Configure safety settings if needed, though defaults are usually fine
          // safetySettings: [
          //   { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
          // ],
        },
      });

      if (media && media.url) {
        return { imageDataUri: media.url };
      }
      console.warn('Image generation did not return a valid media URL. Response:', media);
      return { imageDataUri: null };

    } catch (error) {
      console.error(`Error during image generation in flow for prompt "${input.prompt}":`, error);
      // Return null imageDataUri on any error (e.g., rate limit, API error)
      // The client will handle this as a failed generation.
      return { imageDataUri: null };
    }
  }
);
