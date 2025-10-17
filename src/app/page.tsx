import MainContainer from '@/components/layout/main-container';
import PersonalizedRecommendations from '@/components/personalized-recommendations';
import SongList from '@/components/song-list';
import { getFeaturedSongs, searchSongs } from '@/lib/actions';

export default async function Home({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const searchQuery = searchParams?.q || '';
  const isSearching = !!searchQuery;

  // Fetch data in parallel
  const [initialSongs, searchResults] = await Promise.all([
    isSearching ? Promise.resolve([]) : getFeaturedSongs(),
    isSearching ? searchSongs(searchQuery) : Promise.resolve([]),
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
            <SongList songs={initialSongs} />
          </section>
          <PersonalizedRecommendations />
        </div>
      )}
    </MainContainer>
  );
}
