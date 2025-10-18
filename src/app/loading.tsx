import MainContainer from '@/components/layout/main-container';
import { Logo } from '@/components/icons';

export default function Loading() {
  return (
    <MainContainer>
      <div className="flex h-[60vh] flex-col items-center justify-center gap-6">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/50"></div>
          <div className="relative flex h-full w-full items-center justify-center rounded-full bg-primary/10">
            <Logo className="h-12 w-12 text-primary" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-wider text-primary">
            LoomIG
          </h1>
          <p className="mt-2 text-muted-foreground">Loading your music...</p>
        </div>
      </div>
    </MainContainer>
  );
}
