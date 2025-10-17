import SongCard from '@/components/song-card';
import type { Song } from '@/lib/types';

type SongListProps = {
  songs: Song[];
  emptyStateMessage?: string;
};

export default function SongList({ songs, emptyStateMessage = "No songs to display." }: SongListProps) {
  if (songs.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-border bg-card">
        <p className="text-muted-foreground">{emptyStateMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {songs.map((song) => (
        <SongCard key={song.id} song={song} />
      ))}
    </div>
  );
}
