import MainContainer from '@/components/layout/main-container';
import SongList from '@/components/song-list';
import { searchSongs, getSongsByMood } from '@/lib/actions';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchQuery = (searchParams?.q as string) ?? '';
  const isSearching = !!searchQuery;

  // Fetch data for different sections
  const searchResults = isSearching 
    ? await searchSongs(searchQuery)
    : [];
  
  const trendingSongs = await getSongsByMood('trending', 5);
  const feelGoodSongs = await getSongsByMood('feel-good', 5);
  const travelingSongs = await getSongsByMood('traveling', 5);

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
          <SongList songs={searchResults} emptyStateMessage="No songs found." />
        </section>
      ) : (
        <div className="space-y-12">
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
      )}
    </MainContainer>
  );
}
