import MainContainer from '@/components/layout/main-container';
import SongList from '@/components/song-list';
import { getSongsByMood } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DiscAlbum } from 'lucide-react';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // For now, we ignore search on the homepage and direct users to search via the search bar
  // which will reload the page with query params.
  const searchQuery = (searchParams?.q as string) ?? '';
  const isSearching = !!searchQuery;

  // In a real app, you might have a more complex search results page.
  // For this demo, we'll just show trending if you land on home.
  // The search bar in the header will trigger a reload with the `q` param.
  const searchResults = await getSongsByMood(searchQuery, 20);

  const trendingSongs = await getSongsByMood('trending', 5);
  const feelGoodSongs = await getSongsByMood('feel-good', 5);
  const travelingSongs = await getSongsByMood('traveling', 5);

  if (isSearching) {
     return (
      <MainContainer>
        <section>
          <h1 className="mb-2 font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Search Results
          </h1>
          <p className="mb-8 text-muted-foreground">
            Showing results for "{searchQuery}"
          </p>
          <SongList songs={searchResults} emptyStateMessage="No songs found." />
        </section>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <div className="space-y-12">
        <section className="rounded-lg bg-card p-6 shadow-lg">
          <div className="flex flex-col items-center text-center">
            <h1 className="mb-2 font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Explore Your Sound
            </h1>
            <p className="mb-6 max-w-prose text-muted-foreground">
              Dive into categories curated for every mood and moment. Click below to start your journey.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/browse">
                <DiscAlbum className="mr-2 h-5 w-5" />
                Browse All Categories
              </Link>
            </Button>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-headline text-2xl font-bold tracking-tight md:text-3xl">
            Trending Now
          </h2>
          <SongList songs={trendingSongs} />
        </section>

        <section>
          <h2 className="mb-4 font-headline text-2xl font-bold tracking-tight md:text-3xl">
            Feel Good Jams
          </h2>
          <SongList songs={feelGoodSongs} />
        </section>

        <section>
          <h2 className="mb-4 font-headline text-2xl font-bold tracking-tight md:text-3xl">
            On The Road
          </h2>
          <SongList songs={travelingSongs} />
        </section>
      </div>
    </MainContainer>
  );
}
