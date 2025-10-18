
'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import Link from 'next/link';
import Image from 'next/image';
import { X, Music } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { getRandomPlaceholder } from '@/lib/utils';
import { ImagePlaceholder } from '@/lib/placeholder-images';

export default function NowPlayingCard() {
  const { currentSong } = useSelector((state: RootState) => state.player);
  const [isVisible, setIsVisible] = useState(false);
  const [placeholder, setPlaceholder] = useState<ImagePlaceholder | null>(null);

  useEffect(() => {
    if (currentSong) {
      setIsVisible(true);
      setPlaceholder(getRandomPlaceholder());
    } else {
      setIsVisible(false);
    }
  }, [currentSong]);

  if (!isVisible || !currentSong) {
    return null;
  }

  const imageUrl = currentSong.coverArt || placeholder?.imageUrl || 'https://picsum.photos/seed/default/64/64';
  const imageHint = placeholder?.imageHint || 'music';

  return (
    <div className="fixed bottom-24 right-4 z-50 md:bottom-28">
      <Card className="flex w-64 items-center gap-3 rounded-lg bg-background/80 p-3 shadow-lg backdrop-blur-sm">
        <Link href={`/songs/${currentSong.id}`} className="flex flex-1 items-center gap-3 truncate">
          <div className="relative h-10 w-10 flex-shrink-0">
            <Image
              src={imageUrl}
              alt={currentSong.title}
              width={40}
              height={40}
              className="rounded-md object-cover"
              data-ai-hint={imageHint}
              unoptimized
            />
          </div>
          <div className="flex-1 truncate">
            <p className="truncate text-sm font-semibold">{currentSong.title}</p>
            <p className="truncate text-xs text-muted-foreground">{currentSong.artist}</p>
          </div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 flex-shrink-0 rounded-full"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </Card>
    </div>
  );
}
