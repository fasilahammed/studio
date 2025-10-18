'use client';

import Image from 'next/image';
import { Play, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Song } from '@/lib/types';
import { getRandomPlaceholder } from '@/lib/utils';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { playSong, toggleLikeSong } from '@/lib/features/player/player-slice';
import { RootState } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import AudioVisualizer from './audio-visualizer';
import { Music } from 'lucide-react';

type SongCardProps = {
  song: Song;
  playlist: Song[];
};

export default function SongCard({ song, playlist }: SongCardProps) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { currentSong, isPlaying, likedSongs } = useSelector((state: RootState) => state.player);
  const [placeholder] = useState(getRandomPlaceholder);

  const isActive = currentSong?.id === song.id;
  const isLiked = likedSongs.some(s => s.id === song.id);

  const handlePlayClick = () => {
    dispatch(playSong({ song, playlist }));
  };
  
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const wasLiked = isLiked;
    dispatch(toggleLikeSong(song));
    toast({ 
      title: wasLiked ? "Removed from Liked Songs" : "Added to Liked Songs", 
      description: `"${song.title}" by ${song.artist}` 
    });
  };

  const imageUrl = song.coverArt || placeholder.imageUrl;

  return (
    <>
      <Card className="group relative w-full overflow-hidden rounded-lg border-none bg-card transition-all duration-300 ease-in-out hover:bg-secondary/60">
        <CardContent className="p-0">
          <div className="relative aspect-square">
            <Image
              src={imageUrl}
              alt={song.title}
              width={400}
              height={400}
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              data-ai-hint={placeholder.imageHint}
              unoptimized // Required for external URLs that aren't configured in next.config.js
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <Button
              variant="default"
              size="icon"
              className="absolute bottom-4 right-4 h-12 w-12 scale-0 rounded-full bg-primary/80 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-100 group-hover:bg-primary group-hover:shadow-primary/40"
              onClick={handlePlayClick}
            >
              <Play className="h-6 w-6 fill-current" />
            </Button>
            
            <div className="absolute left-2 top-2 flex flex-col gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLikeClick}
                className={cn(
                  "h-8 w-8 rounded-full bg-black/30 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-primary",
                  isLiked && "text-primary hover:text-primary/80 opacity-100"
                )}
              >
                <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
              </Button>
            </div>

            <div className="absolute bottom-4 left-4 right-20">
              <h3 className="truncate font-headline text-lg font-bold">
                {song.title}
              </h3>
              <p className="truncate text-sm text-muted-foreground">
                {song.artist}
              </p>
            </div>

            {isActive && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                {isPlaying ? (
                  <AudioVisualizer isPlaying={true} />
                ) : (
                  <Play className="h-10 w-10 text-primary" />
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
