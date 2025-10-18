import Link from 'next/link';
import MainContainer from '@/components/layout/main-container';
import { Button } from '@/components/ui/button';
import { TriangleAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <MainContainer>
      <div className="flex h-[60vh] flex-col items-center justify-center text-center">
        <TriangleAlert className="mb-4 h-16 w-16 text-primary" />
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          404 - Page Not Found
        </h1>
        <p className="mb-8 max-w-md text-muted-foreground">
          Oops! It looks like the page you were trying to reach doesn't exist.
          Maybe it was moved, or you mistyped the URL.
        </p>
        <Button asChild>
          <Link href="/">Go Back to Homepage</Link>
        </Button>
      </div>
    </MainContainer>
  );
}
