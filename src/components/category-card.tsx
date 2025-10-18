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
    <Card className="group relative w-full overflow-hidden rounded-lg border-none bg-card transition-all duration-300 ease-in-out hover:bg-secondary/60">
      <CardContent className="p-0">
        <div className={cn("relative", small ? "aspect-square" : "aspect-video")}>
          <Image
            src={category.coverImageUrl}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center p-2">
            <h3 className="text-center font-headline text-lg font-bold text-white">
              {category.name}
            </h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
