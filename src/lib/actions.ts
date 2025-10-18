'use server';

import type { Song } from '@/lib/types';
import { songs as allSongs } from '@/lib/songs';


export async function searchSongs(query: string, limit: number = 20): Promise<Song[]> {
  if (!query) return allSongs.slice(0, limit);
  
  const lowerCaseQuery = query.toLowerCase();

  const results = allSongs.filter(song => 
    song.title.toLowerCase().includes(lowerCaseQuery) ||
    song.artist.toLowerCase().includes(lowerCaseQuery)
  );

  return results.slice(0, limit);
}

export async function getFeaturedSongs(limit: number = 10): Promise<Song[]> {
    return allSongs.slice(0, limit);
}

export async function getSongsByMood(mood: string, limit: number = 10): Promise<Song[]> {
  const results = allSongs.filter(song => song.moods?.includes(mood));
  return results.slice(0, limit);
}
