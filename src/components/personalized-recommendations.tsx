'use client';

import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import SongList from './song-list';
import type { Song } from '@/lib/types';
import { getPersonalizedRecommendations } from '@/ai/flows/personalized-recommendations';
import { useAuth } from '@/context/auth-provider';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

const LoadingSkeleton = () => (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton className="aspect-square w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    ))}
  </div>
);


export default function PersonalizedRecommendations() {
  const { user, login } = useAuth();
  const [recommendations, setRecommendations] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchRecommendations = async () => {
        setIsLoading(true);
        try {
          const result = await getPersonalizedRecommendations({
            listeningHistory: user.listeningHistory,
            preferredGenres: user.preferredGenres,
            preferredArtists: user.preferredArtists,
          });
          const recommendedSongs: Song[] = result.recommendedSongs.map(
            (song) => ({
              id: song.id,
              title: song.title,
              artist: song.artist,
            })
          );
          setRecommendations(recommendedSongs);
        } catch (error) {
          console.error('Failed to get recommendations:', error);
          // Handle error state in UI if needed
        } finally {
          setIsLoading(false);
        }
      };
      fetchRecommendations();
    }
  }, [user]);

  if (!user) {
    return (
      <section className="rounded-lg border-2 border-dashed border-border bg-card p-8 text-center">
        <Sparkles className="mx-auto mb-4 h-10 w-10 text-primary" />
        <h2 className="mb-2 font-headline text-2xl font-bold">
          Unlock Your Personal Mix
        </h2>
        <p className="mb-6 text-muted-foreground">
          Sign in to get AI-powered song recommendations.
        </p>
        <Button onClick={login} size="lg" className="bg-primary hover:bg-primary/90">
          Sign In as Guest
        </Button>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-8 flex items-center gap-3">
        <Sparkles className="h-8 w-8 text-primary" />
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Just For You
          </h1>
          <p className="text-muted-foreground">
            AI-powered recommendations based on your taste
          </p>
        </div>
      </div>
      {isLoading ? <LoadingSkeleton /> : <SongList songs={recommendations} emptyStateMessage="Couldn't generate recommendations at this time."/>}
    </section>
  );
}
