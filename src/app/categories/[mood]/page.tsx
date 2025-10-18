import MainContainer from '@/components/layout/main-container';
import SongList from '@/components/song-list';
import { getSongsByMood } from '@/lib/actions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
}

export default async function CategoryPage({
  params,
}: {
  params: { mood: string };
}) {
  const { mood } = params;
  const songs = await getSongsByMood(mood);
  const title = capitalize(mood);

  return (
    <MainContainer>
      <section>
        <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mb-2 font-headline text-3xl font-bold tracking-tight md:text-4xl">
              {title}
            </h1>
            <p className="text-muted-foreground">
              Songs curated for the {title.toLowerCase()} mood.
            </p>
          </div>
           <Link
              href="/browse"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="mr-2 inline h-4 w-4" />
              Back to Categories
            </Link>
        </div>
        <SongList
          songs={songs}
          emptyStateMessage={`No songs found for the "${title}" category.`}
        />
      </section>
    </MainContainer>
  );
}
