import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Music2 } from 'lucide-react';
import type { Category } from '@/lib/types';
import { cn } from '@/lib/utils';

type CategoryCardProps = {
  category: Category;
  small?: boolean;
};

export default function CategoryCard({ category, small = false }: CategoryCardProps) {
  return (
    <Card className="group relative w-full overflow-hidden rounded-lg border-2 border-transparent bg-card transition-all duration-300 ease-in-out hover:border-primary hover:shadow-lg hover:shadow-primary/20">
      <CardContent className="p-0">
        <div className={cn("relative", small ? "aspect-square" : "aspect-video")}>
          <Image
            src={category.coverImageUrl}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className={cn("absolute bottom-4 left-4 right-4", small && "bottom-2 left-2 right-2")}>
            <h3 className={cn("truncate font-headline text-xl font-bold", small && "text-sm")}>
              {category.name}
            </h3>
             {!small && <p className="truncate text-sm text-muted-foreground">
              {category.description}
            </p>}
          </div>
          
          <div className="absolute right-2 top-2 rounded-full bg-black/40 p-1 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
             <Music2 className="h-4 w-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
