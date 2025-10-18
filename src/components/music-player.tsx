'use client';

import Image from 'next/image';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Volume1,
  VolumeX,
} from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { useEffect, useState, useRef } from 'react';
import AudioVisualizer from './audio-visualizer';
import { getRandomPlaceholder } from '@/lib/utils';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { togglePlay, playNextSong, playPrevSong } from '@/lib/features/player/player-slice';
import { formatTime } from '@/lib/utils';

export default function MusicPlayer() {
  const { currentSong, isPlaying, playlist } = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch();
  
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [placeholder, setPlaceholder] = useState<ImagePlaceholder | null>(null);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (currentSong) {
      setPlaceholder(getRandomPlaceholder());
      setProgress(0);
      if (audioRef.current && currentSong.audioUrl) {
          audioRef.current.src = currentSong.audioUrl;
          audioRef.current.load();
      }
    }
  }, [currentSong]);
  
  useEffect(() => {
    if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.play().catch(error => console.error("Error playing audio:", error));
        } else {
            audioRef.current.pause();
        }
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, currentSong]);


  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleSongEnd = () => {
    dispatch(playNextSong());
  };

  if (!currentSong) {
    return null;
  }

  const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = (clickX / rect.width);
      const newTime = percentage * duration;
      audioRef.current.currentTime = newTime;
      setProgress(percentage * 100);
    }
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVolume = clickX / rect.width;
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
    if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <>
      <audio 
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnd}
        preload="metadata"
      />
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
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 text-muted-foreground" 
                onClick={() => dispatch(playPrevSong())}
                disabled={playlist.length <= 1}
              >
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
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 text-muted-foreground" 
                onClick={() => dispatch(playNextSong())}
                disabled={playlist.length <= 1}
              >
                <SkipForward />
              </Button>
            </div>
            <div className="hidden w-full max-w-md items-center gap-2 md:flex">
              <span className="text-xs text-muted-foreground">{formatTime(currentTime)}</span>
              <Progress 
                value={progress} 
                className="h-1.5 cursor-pointer"
                onPointerDown={handleProgressChange}
              />
              <span className="text-xs text-muted-foreground">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="hidden items-center gap-2 md:flex" style={{ minWidth: '200px', justifyContent: 'flex-end' }}>
            <AudioVisualizer isPlaying={isPlaying} />
            <Button variant="ghost" size="icon" onClick={toggleMute} className="h-10 w-10 text-muted-foreground">
              <VolumeIcon className="h-5 w-5" />
            </Button>
            <Progress 
              value={isMuted ? 0 : volume * 100} 
              className="h-1.5 w-24 cursor-pointer" 
              onPointerDown={handleVolumeChange}
            />
          </div>
        </div>
      </footer>
    </>
  );
}
