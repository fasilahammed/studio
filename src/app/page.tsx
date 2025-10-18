import Link from 'next/link';
import MainContainer from '@/components/layout/main-container';
import CategoryCard from '@/components/category-card';
import type { Category, Song } from '@/lib/types';
import { getSongsByMood, searchSongs } from '@/lib/actions';
import SongCarousel from '@/components/song-carousel';
import SongList from '@/components/song-list';

const categories: Category[] = [
  {
    name: 'Trending Now',
    slug: 'trending',
    description: 'The hottest tracks right now.',
    coverImageUrl: 'https://picsum.photos/seed/cat1/600/600',
  },
  {
    name: 'Feel Good Jams',
    slug: 'feel-good',
    description: 'Upbeat tunes to lift your spirits.',
    coverImageUrl: 'https://picsum.photos/seed/cat2/600/600',
  },
  {
    name: 'On The Road',
    slug: 'traveling',
    description: 'Perfect soundtrack for your journey.',
    coverImageUrl: 'https://picsum.photos/seed/cat3/600/600',
  },
  {
    name: 'Liked Songs',
    slug: '/liked', // This is a direct link, not a category slug
    description: 'Your personal collection of favorites.',
    coverImageUrl: 'https://picsum.photos/seed/cat4/600/600',
  },
   {
    name: 'Chill Vibes',
    slug: 'chill',
    description: 'Relax and unwind with these tunes.',
    coverImageUrl: 'https://picsum.photos/seed/cat5/600/600',
  },
  {
    name: 'Energetic',
    slug: 'energetic',
    description: 'Get pumped up with these tracks.',
    coverImageUrl: 'https://picsum.photos/seed/cat6/600/600',
  },
  {
    name: 'Electronic',
    slug: 'electronic',
    description: 'Enter the world of electronic music.',
    coverImageUrl: 'https://picsum.photos/seed/cat7/600/600',
  },
   {
    name: 'Rock',
    slug: 'rock',
    description: 'Rock out with these classic and new hits.',
    coverImageUrl: 'https://picsum.photos/seed/cat8/600/600',
  },
];

type HomeSectionProps = {
  title: string;
  description: string;
  songs: Song[];
};

function HomeSection({ title, description, songs }: HomeSectionProps) {
  return (
    <section className="mb-12">
      <div className="mb-4">
        <h2 className="font-headline text-2xl font-bold tracking-tight">
          {title}
        </h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <SongCarousel songs={songs} />
    </section>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchQuery = (searchParams?.q as string) ?? '';
  const isSearching = !!searchQuery;

  // If searching, we will show a different page, this can be improved later
  if (isSearching) {
    const searchResults = await searchSongs(searchQuery, 50);
    return (
      <MainContainer>
        <section>
          <div className="mb-8">
            <h1 className="mb-2 font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Search Results
            </h1>
            <p className="text-muted-foreground">
              Showing results for "{searchQuery}"
            </p>
          </div>
          <SongList songs={searchResults} emptyStateMessage="No songs found." />
        </section>
      </MainContainer>
    );
  }

  const trendingSongs = await getSongsByMood('trending', 10);
  const feelGoodSongs = await getSongsByMood('feel-good', 10);
  const travelingSongs = await getSongsByMood('traveling', 10);
  const chillSongs = await getSongsByMood('chill', 10);
  const energeticSongs = await getSongsByMood('energetic', 10);
  const electronicSongs = await getSongsByMood('electronic', 10);
  const rockSongs = await getSongsByMood('rock', 10);

  return (
    <MainContainer>
      <section className="mb-12">
        <div className="mb-6">
          <h1 className="mb-2 font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Browse All
          </h1>
          <p className="text-muted-foreground">
            Explore music by category and mood.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {categories.map((category) => {
            const href = category.slug.startsWith('/')
              ? category.slug
              : `/categories/${category.slug}`;
            return (
              <Link href={href} key={category.slug}>
                <CategoryCard category={category} small />
              </Link>
            );
          })}
        </div>
      </section>

      <HomeSection
        title="Trending Now"
        description="The hottest tracks making waves right now."
        songs={trendingSongs}
      />
      <HomeSection
        title="Feel Good Jams"
        description="Upbeat tunes to lift your spirits."
        songs={feelGoodSongs}
      />
      <HomeSection
        title="On The Road"
        description="The perfect soundtrack for your journey."
        songs={travelingSongs}
      />
       <HomeSection
        title="Chill Vibes"
        description="Relax and unwind with these tunes."
        songs={chillSongs}
      />
      <HomeSection
        title="Energetic"
        description="Get pumped up with these tracks."
        songs={energeticSongs}
      />
      <HomeSection
        title="Electronic"
        description="Enter the world of electronic music."
        songs={electronicSongs}
      />
      <HomeSection
        title="Rock"
        description="Rock out with these classic and new hits."
        songs={rockSongs}
      />
    </MainContainer>
  );
}
