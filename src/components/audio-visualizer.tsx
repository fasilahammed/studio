'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type AudioVisualizerProps = {
  isPlaying: boolean;
};

const BAR_COUNT = 16;

export default function AudioVisualizer({ isPlaying }: AudioVisualizerProps) {
  const bars = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (isPlaying) {
        bars.current.forEach((bar) => {
          if (bar) {
            const newHeight = Math.random() * 80 + 20; // % height
            bar.style.height = `${newHeight}%`;
          }
        });
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      // Reset bars when not playing
      bars.current.forEach((bar) => {
        if (bar) {
          bar.style.height = '20%';
        }
      });
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPlaying]);

  return (
    <div className="flex h-8 w-20 items-end gap-1">
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (bars.current[i] = el!)}
          className={cn(
            'w-full bg-primary/70 transition-all duration-300 ease-in-out',
            !isPlaying && 'h-[20%]'
          )}
          style={{ height: '20%' }}
        />
      ))}
    </div>
  );
}
