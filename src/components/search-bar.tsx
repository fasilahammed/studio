import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SearchBar() {
  return (
    <form action="/" method="GET" className="relative w-full">
      <Input
        type="search"
        name="q"
        placeholder="Search songs, artists..."
        className="h-10 w-full rounded-full border-2 border-secondary bg-transparent pl-12 pr-4 text-base focus-visible:border-primary/60 focus-visible:ring-0"
      />
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>
    </form>
  );
}
