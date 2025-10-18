import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Music2 } from 'lucide-react';
import type { Category } from '@/lib/types';

type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card className="group relative w-full overflow-hidden rounded-lg border-2 border-secondary bg-card transition-all duration-300 ease-in-out hover:border-primary hover:shadow-xl hover:shadow-primary/20">
      <CardContent className="p-0">
        <div className="relative aspect-square">
          <Image
            src={category.coverImageUrl}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* CD Hole Effect */}
          <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-background/30 ring-4 ring-black/30 backdrop-blur-sm transition-all duration-300 group-hover:h-24 group-hover:w-24">
            <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-background ring-2 ring-black/50" />
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="truncate font-headline text-xl font-bold">
              {category.name}
            </h3>
            <p className="truncate text-sm text-muted-foreground">
              {category.description}
            </p>
          </div>
          
          <div className="absolute right-4 top-4 rounded-full bg-black/40 p-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
             <Music2 className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
