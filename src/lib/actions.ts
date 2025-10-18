'use server';

import type { Song, MusicBrainzRecording } from '@/lib/types';

// A list of different placeholder audio URLs to simulate playing different songs.
const placeholderAudioUrls = [
  'https://storage.googleapis.com/studiopa-prod.appspot.com/64483a65-5d71-4191-8935-266162394c8e/assets/a2d3c922-b236-4c40-8b1b-90a612502c38/placeholder.mp3',
  'https://storage.googleapis.com/studiopa-prod.appspot.com/64483a65-5d71-4191-8935-266162394c8e/assets/75fa7577-49a7-47b7-8173-8809405d392b/placeholder2.mp3',
  'https://storage.googleapis.com/studiopa-prod.appspot.com/64483a65-5d71-4191-8935-266162394c8e/assets/78f14115-38dc-4c8d-8e6d-55e1c4a5e016/placeholder3.mp3',
];

// Function to get a random audio URL from the placeholder list
const getRandomAudioUrl = () => {
  return placeholderAudioUrls[Math.floor(Math.random() * placeholderAudioUrls.length)];
};

// Function to safely extract artist name
const getArtistName = (recording: MusicBrainzRecording): string => {
  return recording['artist-credit']?.[0]?.artist?.name || 'Unknown Artist';
};

// Function to map MusicBrainz recordings to our Song type
const mapToSong = (recording: MusicBrainzRecording): Song => ({
  id: recording.id,
  title: recording.title,
  artist: getArtistName(recording),
  // Assign a random placeholder audio URL. In a real app, this would come from an audio provider.
  audioUrl: getRandomAudioUrl(),
});

const fetchFromMusicBrainz = async (path: string, params: URLSearchParams): Promise<any> => {
  const url = `https://musicbrainz.org/ws/2/${path}?${params.toString()}`;
  try {
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'LoomIG/1.0 ( developer@email.com )',
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
