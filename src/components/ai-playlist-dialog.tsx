'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Sparkles, Music, Loader2 } from 'lucide-react';
import type { Song } from '@/lib/types';
import { generatePlaylist } from '@/ai/flows/ai-playlist-generation';
import { usePlayer } from '@/context/player-context';
import { ScrollArea } from './ui/scroll-area';

type AiPlaylistDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  song: Song;
};

type GeneratedSong = {
  title: string;
  artist: string;
}

export function AiPlaylistDialog({ open, onOpenChange, song }: AiPlaylistDialogProps) {
  const { playSong } = usePlayer();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPlaylist, setGeneratedPlaylist] = useState<GeneratedSong[]>([]);

  const handleGeneratePlaylist = async () => {
    setIsLoading(true);
    setGeneratedPlaylist([]);
    try {
      const result = await generatePlaylist({
        seedSongTitle: song.title,
        seedSongArtist: song.artist,
        playlistLength: 10,
      });
      setGeneratedPlaylist(result.songs);
    } catch (error) {
      console.error('Failed to generate playlist:', error);
      // Handle error in UI
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePlaySong = (generatedSong: GeneratedSong) => {
    // We don't have an ID, so we create a mock song object to play
    const songToPlay: Song = {
        id: `${generatedSong.title}-${generatedSong.artist}`, // Create a pseudo-ID
        title: generatedSong.title,
        artist: generatedSong.artist
    };
    playSong(songToPlay);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <DialogTitle className="text-2xl font-headline">AI Playlist Generator</DialogTitle>
          </div>
          <DialogDescription>
            Create a playlist of 10 songs based on{' '}
            <span className="font-semibold text-primary">{song.title}</span> by{' '}
            <span className="font-semibold text-foreground">{song.artist}</span>.
          </DialogDescription>
        </DialogHeader>
        
        {generatedPlaylist.length > 0 ? (
          <div className="mt-4 space-y-2">
            <h3 className="font-semibold">Generated Playlist:</h3>
            <ScrollArea className="h-64">
              <ul className="space-y-2 pr-4">
                {generatedPlaylist.map((item, index) => (
                   <li key={index} className="flex items-center justify-between gap-4 p-2 rounded-md hover:bg-secondary">
                     <div className="flex items-center gap-3 overflow-hidden">
                       <Music className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                       <div className="overflow-hidden">
                         <p className="font-medium truncate">{item.title}</p>
                         <p className="text-sm text-muted-foreground truncate">{item.artist}</p>
                       </div>
                     </div>
                     <Button variant="ghost" size="sm" onClick={() => handlePlaySong(item)}>Play</Button>
                   </li>
                ))}
              </ul>
            </ScrollArea>
            <Button onClick={() => setGeneratedPlaylist([])} className="w-full mt-4">Generate Again</Button>
          </div>
        ) : (
          <div className="flex h-48 flex-col items-center justify-center gap-4 py-8">
            <Button
              onClick={handleGeneratePlaylist}
              disabled={isLoading}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Playlist
                </>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
