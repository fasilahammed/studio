import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { PlayerProvider } from '@/context/player-context';
import { AuthProvider } from '@/context/auth-provider';
import Header from '@/components/layout/header';
import MusicPlayer from '@/components/music-player';
import './globals.css';

export const metadata: Metadata = {
  title: 'MelodiaVerse',
  description: 'Discover your next favorite song.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <PlayerProvider>
            <div className="relative min-h-screen bg-[#222] text-foreground">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
              <div className="relative z-10 flex min-h-screen flex-col">
                <Header />
                <main className="flex-grow">{children}</main>
                <MusicPlayer />
              </div>
            </div>
            <Toaster />
          </PlayerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
