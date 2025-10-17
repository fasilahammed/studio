'use server';

/**
 * @fileOverview AI-powered personalized song recommendations based on user listening history and preferences.
 *
 * - getPersonalizedRecommendations - A function that retrieves personalized song recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const PersonalizedRecommendationsInputSchema = z.object({
  listeningHistory: z.array(z.string()).describe('Array of song IDs representing the user\'s listening history.'),
  preferredGenres: z.array(z.string()).describe('Array of the user\'s preferred music genres.'),
  preferredArtists: z.array(z.string()).describe('Array of the user\'s preferred artists.'),
});
export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendedSongs: z.array(z.object({
    id: z.string().describe('The unique identifier of the recommended song.'),
    title: z.string().describe('The title of the recommended song.'),
    artist: z.string().describe('The artist of the recommended song.'),
  })).describe('An array of recommended songs based on the user\'s preferences.'),
});
export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;

export async function getPersonalizedRecommendations(input: PersonalizedRecommendationsInput): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an AI music expert. Given a user's listening history, preferred genres, and preferred artists, you will recommend songs that they might enjoy.

  Here is the user's listening history (song IDs): {{{listeningHistory}}}
  Here are the user's preferred genres: {{{preferredGenres}}}
  Here are the user's preferred artists: {{{preferredArtists}}}

  Please provide song recommendations in the following JSON format:
  {{#json recommendedSongs}}
  [
    {
      "id": "song123",
      "title": "Example Song Title",
      "artist": "Example Artist Name"
    }
  ]
  {{/json}}

  Ensure that the recommendations align with the user's taste and are diverse, exploring new artists and tracks within their favored genres.
`,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
