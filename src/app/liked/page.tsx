'use client';

import MainContainer from '@/components/layout/main-container';
import SongList from '@/components/song-list';
import { usePlayer } from '@/context/player-context';

export default function LikedSongsPage() {
  const { likedSongs } = usePlayer();

  return (
    <MainContainer>
      <section>
        <h1 className="mb-2 font-headline text-3xl font-bold tracking-tight md:text-4xl">
          Liked Songs
        </h1>
        <p className="mb-8 text-muted-foreground">
          Your favorite tracks, all in one place.
        </p>
        <SongList
          songs={likedSongs}
          emptyStateMessage="You haven't liked any songs yet."
        />
      </section>
    </MainContainer>
  );
}
