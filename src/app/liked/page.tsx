'use client';

import Link from 'next/link';
import MainContainer from '@/components/layout/main-container';
import SongList from '@/components/song-list';
import { ArrowLeft } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

export default function LikedSongsPage() {
  const { likedSongs } = useSelector((state: RootState) => state.player);

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
           <Link
              href="/"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="mr-2 inline h-4 w-4" />
              Back to Home
            </Link>
        </div>
        <SongList
          songs={likedSongs}
          emptyStateMessage="You haven't liked any songs yet."
        />
      </section>
    </MainContainer>
  );
}
