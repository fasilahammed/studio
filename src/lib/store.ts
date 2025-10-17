import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './features/player/player-slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      player: playerReducer,
    },
    // Adding middleware to save liked songs to localStorage
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ['player/setLikedSongsFromStorage', 'player/toggleLikeSong'],
          // Ignore these field paths in all actions
          ignoredActionPaths: ['payload.song'],
          // Ignore these paths in the state
          ignoredPaths: ['player.likedSongs'],
        },
      }).concat(localStorageMiddleware),
  });
};

// Custom middleware to sync likedSongs with localStorage
const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  if (action.type === 'player/toggleLikeSong') {
    const state = store.getState();
    try {
      window.localStorage.setItem('likedSongs', JSON.stringify(state.player.likedSongs));
    } catch (e) {
      console.error("Could not save liked songs to local storage", e);
    }
  }
  return result;
};


export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
