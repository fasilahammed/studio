import MainContainer from '@/components/layout/main-container';
import SongList from '@/components/song-list';
import { searchSongs } from '@/lib/actions';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchQuery = (searchParams?.q as string) ?? '';
  const isSearching = !!searchQuery;

  // Fetch data: search results if a query exists, otherwise featured songs.
  const songs = isSearching 
    ? await searchSongs(searchQuery)
    : await searchSongs('Dua Lipa');

  return (
    <MainContainer>
      {isSearching ? (
        <section>
          <h1 className="mb-2 font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Search Results
          </h1>
          <p className="mb-8 text-muted-foreground">
            Showing results for "{searchQuery}"
          </p>
          <SongList songs={songs} emptyStateMessage="No songs found." />
        </section>
      ) : (
        <div className="space-y-16">
          <section>
            <h1 className="mb-2 font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Trending Now
            </h1>
            <p className="mb-8 text-muted-foreground">
              Popular tracks making waves right now.
            </p>
            <SongList songs={songs.slice(0,10)} />
          </section>
        </div>
      )}
    </MainContainer>
  );
}
