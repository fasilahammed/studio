'use client'
import { useRef, ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/lib/store'
import { setLikedSongsFromStorage } from './features/player/player-slice'
import type { Song } from './types'

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  
  // Load liked songs from local storage on initial client-side render
  useEffect(() => {
    try {
      const storedLikes = window.localStorage.getItem('likedSongs');
      if (storedLikes && storeRef.current) {
        const likedSongs: Song[] = JSON.parse(storedLikes);
        storeRef.current.dispatch(setLikedSongsFromStorage(likedSongs));
      }
    } catch (error) {
      console.error('Could not load liked songs from local storage', error);
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>
}
