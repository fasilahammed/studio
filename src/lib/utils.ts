import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomPlaceholder() {
  if (PlaceHolderImages.length === 0) {
    return {
      id: "default",
      description: "Default placeholder",
      imageUrl: "https://picsum.photos/seed/default/400/400",
      imageHint: "abstract music"
    };
  }
  return PlaceHolderImages[Math.floor(Math.random() * PlaceHolderImages.length)];
}

export function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
