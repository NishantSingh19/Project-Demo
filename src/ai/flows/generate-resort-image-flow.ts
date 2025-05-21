
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
  imageDataUri: z.string().describe("The generated image as a data URI. Expected format: 'data:image/png;base64,<encoded_data>'."),
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

    if (!media || !media.url) {
      console.error('Image generation failed or did not return a media URL. Response:', media);
      throw new Error('Image generation failed or did not return a media URL.');
    }

    return { imageDataUri: media.url };
  }
);
