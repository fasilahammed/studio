'use client';

import Image from 'next/image';
import { MoreHorizontal, Music, Play, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePlayer } from '@/context/player-context';
import type { Song } from '@/lib/types';
import { getRandomPlaceholder } from '@/lib/utils';
import { useState } from 'react';
import { AiPlaylistDialog } from './ai-playlist-dialog';

type SongCardProps = {
  song: Song;
};

export default function SongCard({ song }: SongCardProps) {
  const { playSong, currentSong, isPlaying } = usePlayer();
  const [placeholder] = useState(getRandomPlaceholder);
  const [isPlaylistDialogOpen, setIsPlaylistDialogOpen] = useState(false);

  const isActive = currentSong?.id === song.id;

  return (
    <>
      <Card className="group relative w-full overflow-hidden border-none bg-card transition-all duration-300 ease-in-out hover:bg-secondary/60">
        <CardContent className="p-0">
          <div className="relative aspect-square">
            <Image
              src={placeholder.imageUrl}
              alt={song.title}
              width={400}
              height={400}
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              data-ai-hint={placeholder.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/30 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-primary"
              onClick={() => playSong(song)}
            >
              <Play className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-2 h-8 w-8 rounded-full bg-black/30 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-primary"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setIsPlaylistDialogOpen(true)}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  <span>AI Playlist</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="absolute bottom-4 left-4 right-4">
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
                  <Music className="h-10 w-10 animate-pulse text-primary" />
                ) : (
                  <Play className="h-10 w-10 text-primary" />
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <AiPlaylistDialog 
        open={isPlaylistDialogOpen}
        onOpenChange={setIsPlaylistDialogOpen}
        song={song}
      />
    </>
  );
}
