'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import type { Song } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  likedSongs: Song[];
  playSong: (song: Song) => void;
  togglePlay: () => void;
  toggleLikeSong: (song: Song) => void;
  isLiked: (songId: string) => boolean;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedLikes = window.localStorage.getItem('likedSongs');
      if (storedLikes) {
        setLikedSongs(JSON.parse(storedLikes));
      }
    } catch (error) {
      console.error('Could not load liked songs from local storage', error);
    }
  }, []);

  const playSong = useCallback((song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    if (currentSong) {
      setIsPlaying((prev) => !prev);
    }
  }, [currentSong]);
  
  const isLiked = useCallback((songId: string) => {
    return likedSongs.some(s => s.id === songId);
  }, [likedSongs]);

  const toggleLikeSong = useCallback((song: Song) => {
    setLikedSongs(prev => {
      const isAlreadyLiked = prev.some(s => s.id === song.id);
      let newLikedSongs: Song[];

      if (isAlreadyLiked) {
        newLikedSongs = prev.filter(s => s.id !== song.id);
        toast({ title: "Removed from Liked Songs", description: `"${song.title}" by ${song.artist}` });
      } else {
        newLikedSongs = [...prev, song];
        toast({ title: "Added to Liked Songs", description: `"${song.title}" by ${song.artist}` });
      }
      
      try {
        window.localStorage.setItem('likedSongs', JSON.stringify(newLikedSongs));
      } catch (error) {
        console.error('Could not save liked songs to local storage', error);
      }
      
      return newLikedSongs;
    });
  }, [toast]);


  return (
    <PlayerContext.Provider value={{ currentSong, isPlaying, playSong, togglePlay, likedSongs, toggleLikeSong, isLiked }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
