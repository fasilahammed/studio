'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { Song } from '@/lib/types';

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  togglePlay: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = useCallback((song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    if (currentSong) {
      setIsPlaying((prev) => !prev);
    }
  }, [currentSong]);

  return (
    <PlayerContext.Provider value={{ currentSong, isPlaying, playSong, togglePlay }}>
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
