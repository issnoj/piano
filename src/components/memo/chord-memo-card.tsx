import React from 'react';
import { MemoChord, useChordMemoContext } from './chord-memo-provider';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Props = {
  memoChord: MemoChord;
};

export const ChordMemoCard = ({ memoChord }: Props) => {
  const { remove } = useChordMemoContext();
  const createdAt = new Date(memoChord.createdAt);
  return (
    <Link
      className="rounded-lg border bg-background p-4 shadow-lg"
      href={`/chord/memo/${memoChord.id}`}
    >
      <h6
        className={cn(
          'text-xl font-semibold truncate',
          memoChord.title === '' && 'text-foreground/60',
        )}
      >
        {memoChord.title || '無題'}
      </h6>
      <div className="my-2 truncate">{memoChord.chords}</div>
      <div className="flex items-center justify-between gap-3">
        <CreatedAt>
          {createdAt.toLocaleDateString()} {createdAt.toLocaleTimeString()}
        </CreatedAt>
        <Button
          variant="outline"
          size="icon"
          onClick={() => remove(memoChord.id)}
        >
          <Trash className="size-4" />
        </Button>
      </div>
    </Link>
  );
};

const CreatedAt = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) => (
  <div className="text-xs" {...props}>
    {children}
  </div>
);
