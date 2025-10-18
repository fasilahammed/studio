import MusicPlayer from '@/components/music-player';
import NowPlayingCard from '@/components/now-playing-card';

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <NowPlayingCard />
      <MusicPlayer />
    </>
  );
}
