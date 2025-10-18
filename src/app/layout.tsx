import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import MusicPlayer from '@/components/music-player';
import './globals.css';
import StoreProvider from '@/lib/StoreProvider';
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'LoomIG',
  description: 'Discover your next favorite song.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} font-body antialiased`}>
          <StoreProvider>
            <div className="relative min-h-screen bg-background text-foreground">
               <div className="absolute inset-0 z-0 h-full w-full bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(229,72,72,0.2),rgba(255,255,255,0))]"></div>
              <div className="relative z-10 flex min-h-screen flex-col">
                <Header />
                <main className="flex-grow">{children}</main>
                <MusicPlayer />
              </div>
            </div>
            <Toaster />
          </StoreProvider>
      </body>
    </html>
  );
}
