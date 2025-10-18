'use server';

import type { Song, AudioDbTrack } from '@/lib/types';

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

// Function to map AudioDB tracks to our Song type
const mapToSong = (track: AudioDbTrack): Song => ({
  id: track.idTrack,
  title: track.strTrack,
  artist: track.strArtist,
  // Assign a random placeholder audio URL. TheAudioDB sometimes provides a music video link, but not direct audio.
  audioUrl: track.strMusicVid ?? getRandomAudioUrl(),
  coverArt: track.strTrackThumb
});

const fetchFromTheAudioDB = async (path: string, params: URLSearchParams): Promise<any> => {
  const API_KEY = '2'; // TheAudioDB free API key
  const url = `https://www.theaudiodb.com/api/v1/json/${API_KEY}/${path}?${params.toString()}`;
  try {
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 }, // Revalidate once per hour
    });

    if (!res.ok) {
      console.error(`TheAudioDB API error: ${res.status} ${res.statusText}`);
      return null;
    }
    
    // TheAudioDB can return an empty body for "not found" cases, which causes JSON.parse to fail.
    const text = await res.text();
    if (!text) {
        return null; // Return null if the response body is empty.
    }
    return JSON.parse(text);

  } catch (error) {
    console.error('Failed to fetch or parse from TheAudioDB API:', error);
    return null;
  }
}

export async function searchSongs(query: string, limit: number = 20): Promise<Song[]> {
  if (!query) return [];
  
  // TheAudioDB's search endpoint is simpler. We'll search by track name.
  // It doesn't support complex queries like MusicBrainz.
  const params = new URLSearchParams({
    t: query
  });

  const data = await fetchFromTheAudioDB('searchtrack.php', params);
  
  if (!data || !data.track) {
    // If track search fails, let's try searching by artist as a fallback
    const artistParams = new URLSearchParams({ s: query });
    const artistData = await fetchFromTheAudioDB('search.php', artistParams);
    if (!artistData || !artistData.artists) return [];

    // If artist found, get their top tracks
    const artistId = artistData.artists[0].idArtist;
    const topTracksParams = new URLSearchParams({ i: artistId });
    const topTracksData = await fetchFromTheAudioDB('track-top10.php', topTracksParams);
    
    if (!topTracksData || !topTracksData.track) return [];
    return topTracksData.track.slice(0, limit).map(mapToSong);
  }

  return data.track.slice(0, limit).map(mapToSong);
}

export async function getFeaturedSongs(): Promise<Song[]> {
  // Replicating user's original request for "arijit singh"
  return searchSongs('Arijit Singh', 10);
}
