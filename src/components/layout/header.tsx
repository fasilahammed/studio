import Link from 'next/link';
import { Logo } from '@/components/icons';
import { SearchBar } from '@/components/search-bar';
import { AuthDialog } from '@/components/auth-dialog';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold tracking-wider">
            MelodiaVerse
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="hidden sm:block sm:w-full sm:max-w-xs">
            <SearchBar />
          </div>
          <AuthDialog />
        </div>
      </div>
       <div className="container mx-auto px-4 pb-4 sm:hidden">
            <SearchBar />
       </div>
    </header>
  );
}
