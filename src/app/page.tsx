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
    isSearching ? Promise.resolve([]) : searchSongs('artist:"Arijit Singh"', 5),
    isSearching ? Promise.resolve([]) : searchSongs('tag:pop', 5),
    isSearching ? Promise.resolve([]) : searchSongs('tag:rock', 5),
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
              Featured Artist
            </h1>
            <p className="mb-8 text-muted-foreground">
              A selection of popular tracks by Arijit Singh
            </p>
            <SongList songs={featuredSongs} />
          </section>
           <section>
            <h2 className="mb-2 font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Popular Pop
            </h2>
            <p className="mb-8 text-muted-foreground">
              Trending pop songs you might like.
            </p>
            <SongList songs={popSongs} />
          </section>
          <section>
            <h2 className="mb-2 font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Rock Essentials
            </h2>
            <p className="mb-8 text-muted-foreground">
              Must-listen rock anthems.
            </p>
            <SongList songs={rockSongs} />
          </section>
        </div>
      )}
    </MainContainer>
  );
}
