'use client';

import Link from 'next/link';
import MainContainer from '@/components/layout/main-container';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfilePage() {

  return (
    <MainContainer>
      <section className="text-center">
        <div className="mb-8 flex flex-col items-center gap-4">
           <Avatar className="h-32 w-32 border-4 border-primary">
              <AvatarImage src="https://picsum.photos/seed/user/200/200" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          <div>
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
              Your Profile
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Welcome to your personal space in MelodiaVerse.
            </p>
          </div>
        </div>
        
        <div className="mx-auto max-w-md space-y-4">
            <p className="text-muted-foreground">
                This is where your user profile information will be displayed. You'll be able to customize your details, view your listening statistics, and manage your account settings right here.
            </p>
            <p className="text-sm text-accent-foreground/50">
              User authentication and detailed profiles are coming soon!
            </p>
            <Button asChild>
                <Link href="/liked">
                    View Your Liked Songs
                </Link>
            </Button>
        </div>

      </section>
    </MainContainer>
  );
}
