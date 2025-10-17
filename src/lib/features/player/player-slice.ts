import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Song } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  likedSongs: Song[];
}

const initialState: PlayerState = {
  currentSong: null,
  isPlaying: false,
  likedSongs: [],
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playSong: (state, action: PayloadAction<Song>) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    togglePlay: (state) => {
      if (state.currentSong) {
        state.isPlaying = !state.isPlaying;
      }
    },
    setLikedSongsFromStorage: (state, action: PayloadAction<Song[]>) => {
        state.likedSongs = action.payload;
    },
    toggleLikeSong: (state, action: PayloadAction<Song>) => {
      const song = action.payload;
      const isAlreadyLiked = state.likedSongs.some((s) => s.id === song.id);

      if (isAlreadyLiked) {
        state.likedSongs = state.likedSongs.filter((s) => s.id !== song.id);
      } else {
        state.likedSongs.push(song);
      }
    },
  },
});

export const { playSong, togglePlay, toggleLikeSong, setLikedSongsFromStorage } = playerSlice.actions;

export default playerSlice.reducer;
