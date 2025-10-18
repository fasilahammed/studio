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

  // Fetch data in parallel
  const [searchResults, featuredSongs, popSongs, rockSongs] = await Promise.all([
    isSearching ? searchSongs(searchQuery) : Promise.resolve([]),
    isSearching ? Promise.resolve([]) : searchSongs('Trending'),
    isSearching ? Promise.resolve([]) : searchSongs('Pop'),
    isSearching ? Promise.resolve([]) : searchSongs('Rock'),
  ]);

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
        <div className="space-y-16">
          <section>
            <h1 className="mb-2 font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Trending Now
            </h1>
            <p className="mb-8 text-muted-foreground">
              Popular tracks making waves right now.
            </p>
            <SongList songs={featuredSongs.slice(0,5)} />
          </section>
           <section>
            <h2 className="mb-2 font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Popular Pop
            </h2>
            <p className="mb-8 text-muted-foreground">
              The biggest pop hits at the moment.
            </p>
            <SongList songs={popSongs.slice(0,5)} />
          </section>
          <section>
            <h2 className="mb-2 font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Rock Essentials
            </h2>
            <p className="mb-8 text-muted-foreground">
              Must-listen rock anthems.
            </p>
            <SongList songs={rockSongs.slice(0,5)} />
          </section>
        </div>
      )}
    </MainContainer>
  );
}
