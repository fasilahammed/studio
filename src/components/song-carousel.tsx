
'use client';

import SongCard from '@/components/song-card';
import type { Song } from '@/lib/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type SongCarouselProps = {
  songs: Song[];
};

export default function SongCarousel({ songs }: SongCarouselProps) {
  const validSongs = songs.filter((song) => song);

  if (validSongs.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-border bg-card">
        <p className="text-muted-foreground">No songs to display.</p>
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: 'start',
        slidesToScroll: 'auto',
      }}
      className="w-full"
    >
      <CarouselContent>
        {validSongs.map((song) => (
          <CarouselItem key={song.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
            <SongCard song={song} playlist={validSongs} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-[-24px] hidden -translate-y-1/2 sm:flex" />
      <CarouselNext className="right-[-24px] hidden -translate-y-1/2 sm:flex" />
    </Carousel>
  );
}
