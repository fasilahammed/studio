
import { songs } from '@/lib/songs';
import { notFound } from 'next/navigation';
import MainContainer from '@/components/layout/main-container';
import Image from 'next/image';
import SongList from '@/components/song-list';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SongPage({ params }: { params: { songId: string } }) {
  const song = songs.find((s) => s.id === params.songId);

  if (!song) {
    notFound();
  }

  // Find related songs by mood
  const relatedSongs = songs.filter(s => 
    s.id !== song.id &&
    s.moods?.some(mood => song.moods?.includes(mood))
  ).slice(0, 5);

  return (
    <MainContainer>
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-8 md:flex-row md:gap-12">
        <div className="w-full md:w-1/3">
          <Image
            src={song.coverArt || 'https://picsum.photos/seed/default/600/600'}
            alt={song.title}
            width={600}
            height={600}
            className="w-full rounded-lg object-cover shadow-lg"
            unoptimized
          />
        </div>
        <div className="flex-1">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            {song.title}
          </h1>
          <p className="mt-2 text-xl text-muted-foreground md:text-2xl">
            {song.artist}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {song.moods?.map(mood => (
                <Link key={mood} href={`/categories/${mood}`}>
                    <span className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground transition-colors hover:bg-primary/80">
                        {mood.charAt(0).toUpperCase() + mood.slice(1)}
                    </span>
                </Link>
            ))}
          </div>
          
          <div className="mt-8">
             <h2 className="mb-4 font-headline text-2xl font-bold">Play Now</h2>
              <p className="text-muted-foreground">Click the card below to start listening.</p>
             <div className='mt-4 w-full max-w-xs'>
                <SongList songs={[song]} />
             </div>
          </div>
          
        </div>
      </div>

       <div className="mt-16">
        <h2 className="mb-4 font-headline text-2xl font-bold">Related Songs</h2>
        <SongList songs={relatedSongs} emptyStateMessage="No related songs found." />
      </div>
    </MainContainer>
  );
}
