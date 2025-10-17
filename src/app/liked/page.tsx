'use client';

import Link from 'next/link';
import MainContainer from '@/components/layout/main-container';
import SongList from '@/components/song-list';
import { Button } from '@/components/ui/button';
import { usePlayer } from '@/context/player-context';
import { ArrowLeft } from 'lucide-react';

export default function LikedSongsPage() {
  const { likedSongs } = usePlayer();

  return (
    <MainContainer>
      <section>
        <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mb-2 font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Liked Songs
            </h1>
            <p className="text-muted-foreground">
              Your favorite tracks, all in one place.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
        <SongList
          songs={likedSongs}
          emptyStateMessage="You haven't liked any songs yet."
        />
      </section>
    </MainContainer>
  );
}
