import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SearchBar() {
  return (
    <form action="/" method="GET" className="relative w-full">
      <Input
        type="search"
        name="q"
        placeholder="Search songs, artists..."
        className="h-9 w-full rounded-full border-none bg-secondary pl-10 pr-4 text-sm focus-visible:ring-2 focus-visible:ring-primary/50"
      />
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
    </form>
  );
}
