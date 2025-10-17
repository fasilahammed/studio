'use client';

import Image from 'next/image';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { useEffect, useState } from 'react';
import AudioVisualizer from './audio-visualizer';
import { getRandomPlaceholder } from '@/lib/utils';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { togglePlay } from '@/lib/features/player/player-slice';

export default function MusicPlayer() {
  const { currentSong, isPlaying } = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const [placeholder, setPlaceholder] = useState<ImagePlaceholder | null>(null);

  useEffect(() => {
    if (currentSong) {
      setPlaceholder(getRandomPlaceholder());
      setProgress(0);
    }
  }, [currentSong]);

  useEffect(() => {
    let animationFrameId: number;
    if (isPlaying && currentSong) {
      const animate = () => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.1));
        animationFrameId = requestAnimationFrame(animate);
      };
      animationFrameId = requestAnimationFrame(animate);
    }
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPlaying, currentSong]);

  if (!currentSong) {
    return null;
  }

  return (
    <footer className="sticky bottom-0 z-40 mt-auto w-full border-t border-border/40 bg-background/95 p-4 backdrop-blur-sm">
      <div className="container mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-4" style={{ minWidth: '200px' }}>
          {placeholder && (
            <Image
              src={placeholder.imageUrl}
              alt={currentSong.title}
              width={56}
              height={56}
              className="h-14 w-14 rounded-md object-cover"
              data-ai-hint={placeholder.imageHint}
            />
          )}
          <div>
            <h4 className="truncate font-headline font-semibold">
              {currentSong.title}
            </h4>
            <p className="truncate text-sm text-muted-foreground">
              {currentSong.artist}
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground" disabled>
              <SkipBack />
            </Button>
            <Button
              variant="default"
              size="icon"
              className="h-12 w-12 rounded-full bg-primary shadow-lg shadow-primary/30 hover:bg-primary/90"
              onClick={() => dispatch(togglePlay())}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 fill-current" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground" disabled>
              <SkipForward />
            </Button>
          </div>
          <div className="hidden w-full max-w-md items-center gap-2 md:flex">
             <span className="text-xs text-muted-foreground">1:23</span>
             <Progress value={progress} className="h-1.5" />
             <span className="text-xs text-muted-foreground">3:45</span>
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex" style={{ minWidth: '200px', justifyContent: 'flex-end' }}>
          <AudioVisualizer isPlaying={isPlaying} />
          <Volume2 className="h-5 w-5 text-muted-foreground" />
          <Progress value={70} className="h-1.5 w-24" />
        </div>
      </div>
    </footer>
  );
}
