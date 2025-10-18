import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Song } from '@/lib/types';

interface PlayerState {
  currentSong: Song | null;
  currentSongIndex: number;
  playlist: Song[];
  isPlaying: boolean;
  likedSongs: Song[];
}

const initialState: PlayerState = {
  currentSong: null,
  currentSongIndex: -1,
  playlist: [],
  isPlaying: false,
  likedSongs: [],
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playSong: (state, action: PayloadAction<{ song: Song, playlist: Song[] }>) => {
      const { song, playlist } = action.payload;
      state.playlist = playlist;
      state.currentSong = song;
      state.currentSongIndex = playlist.findIndex(s => s.id === song.id);
      state.isPlaying = true;
    },
    togglePlay: (state) => {
      if (state.currentSong) {
        state.isPlaying = !state.isPlaying;
      }
    },
    playNextSong: (state) => {
        if (state.playlist.length > 0) {
            const nextIndex = (state.currentSongIndex + 1) % state.playlist.length;
            state.currentSongIndex = nextIndex;
            state.currentSong = state.playlist[nextIndex];
            state.isPlaying = true;
        }
    },
    playPrevSong: (state) => {
        if (state.playlist.length > 0) {
            const prevIndex = (state.currentSongIndex - 1 + state.playlist.length) % state.playlist.length;
            state.currentSongIndex = prevIndex;
            state.currentSong = state.playlist[prevIndex];
            state.isPlaying = true;
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

export const { playSong, togglePlay, playNextSong, playPrevSong, toggleLikeSong, setLikedSongsFromStorage } = playerSlice.actions;

export default playerSlice.reducer;
