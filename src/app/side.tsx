'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Side = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <div className={cn(className)}>
      <div className="space-y-1 px-3 py-2">
        <Button
          className={cn(
            'h-9 w-full justify-start',
            pathname === '/chord' && 'bg-muted',
          )}
          variant="ghost"
          asChild
        >
          <Link href="/chord">Chord</Link>
        </Button>
        <Button
          className={cn(
            'h-9 w-full justify-start',
            pathname === '/scale' && 'bg-muted',
          )}
          variant="ghost"
          asChild
        >
          <Link href="/scale">Scale</Link>
        </Button>
      </div>
    </div>
  );
};
