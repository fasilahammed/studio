'use server';

/**
 * @fileOverview A flow for generating a playlist based on a seed song.
 *
 * - generatePlaylist - A function that generates a playlist based on a seed song.
 * - AiPlaylistGenerationInput - The input type for the generatePlaylist function.
 * - AiPlaylistGenerationOutput - The return type for the generatePlaylist function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiPlaylistGenerationInputSchema = z.object({
  seedSongTitle: z.string().describe('The title of the seed song.'),
  seedSongArtist: z.string().describe('The artist of the seed song.'),
  playlistLength: z.number().default(10).describe('The desired length of the playlist.'),
});

export type AiPlaylistGenerationInput = z.infer<typeof AiPlaylistGenerationInputSchema>;

const AiPlaylistGenerationOutputSchema = z.object({
  songs: z.array(
    z.object({
      title: z.string().describe('The title of the song.'),
      artist: z.string().describe('The artist of the song.'),
    })
  ).describe('A list of songs similar to the seed song.'),
});

export type AiPlaylistGenerationOutput = z.infer<typeof AiPlaylistGenerationOutputSchema>;

export async function generatePlaylist(input: AiPlaylistGenerationInput): Promise<AiPlaylistGenerationOutput> {
  return aiPlaylistGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPlaylistGenerationPrompt',
  input: {schema: AiPlaylistGenerationInputSchema},
  output: {schema: AiPlaylistGenerationOutputSchema},
  prompt: `You are a playlist generation expert. Generate a playlist of {{playlistLength}} songs that are similar to the song "{{seedSongTitle}}" by {{seedSongArtist}}. Return a JSON array of songs with the title and artist.
`,
});

const aiPlaylistGenerationFlow = ai.defineFlow(
  {
    name: 'aiPlaylistGenerationFlow',
    inputSchema: AiPlaylistGenerationInputSchema,
    outputSchema: AiPlaylistGenerationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
