'use server';

import type { Song, MusicBrainzRecording } from '@/lib/types';

// Function to safely extract artist name
const getArtistName = (recording: MusicBrainzRecording): string => {
  return recording['artist-credit']?.[0]?.artist?.name || 'Unknown Artist';
};

// Function to map MusicBrainz recordings to our Song type
const mapToSong = (recording: MusicBrainzRecording): Song => ({
  id: recording.id,
  title: recording.title,
  artist: getArtistName(recording),
});

const fetchFromMusicBrainz = async (path: string, params: URLSearchParams): Promise<any> => {
  const url = `https://musicbrainz.org/ws/2/${path}?${params.toString()}`;
  try {
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'MelodiaVerse/1.0 (https://melodiaverse.app/contact)',
      },
      next: { revalidate: 3600 }, // Revalidate once per hour
    });

    if (!res.ok) {
      console.error(`MusicBrainz API error: ${res.status} ${res.statusText}`);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error('Failed to fetch from MusicBrainz API:', error);
    return null;
  }
}

export async function searchSongs(query: string, limit: number = 20): Promise<Song[]> {
  if (!query) return [];
  
  const params = new URLSearchParams({
    query: query,
    limit: limit.toString(),
    fmt: 'json'
  });

  const data = await fetchFromMusicBrainz('recording', params);
  
  if (!data || !data.recordings) {
    return [];
  }

  return data.recordings.map(mapToSong);
}

export async function getFeaturedSongs(): Promise<Song[]> {
  // Replicating user's original request for "arijit singh"
  return searchSongs('artist:"Arijit Singh" AND country:IN', 10);
}
