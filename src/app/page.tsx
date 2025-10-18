import Link from 'next/link';
import MainContainer from '@/components/layout/main-container';
import CategoryCard from '@/components/category-card';
import type { Category } from '@/lib/types';

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
];

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const searchQuery = (searchParams?.q as string) ?? '';
  const isSearching = !!searchQuery;
  
  // If searching, we will show a different page, this can be improved later
  if (isSearching) {
    const searchResults = await getSongsByMood(searchQuery, 20);
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
      <div className="mb-8">
        <h1 className="mb-2 font-headline text-3xl font-bold tracking-tight md:text-4xl">
          Browse All
        </h1>
        <p className="text-muted-foreground">
          Explore music by category and mood.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {categories.map((category) => {
          const href = category.slug.startsWith('/') ? category.slug : `/categories/${category.slug}`;
          return (
             <Link href={href} key={category.slug}>
              <CategoryCard category={category} small />
            </Link>
          )
        })}
      </div>
    </MainContainer>
  );
}
