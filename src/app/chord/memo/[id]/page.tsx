'use client';

import {
  MemoChord,
  useChordMemoContext,
} from '@/components/memo/chord-memo-provider';
import { input2scoreData } from '@/components/memo/input-chord';
import { Score } from '@/components/score/score';
import React from 'react';

export default function Page({ params }: { params: { id: string } }) {
  const [memoChord, setMemoChord] = React.useState<MemoChord>();
  const { read } = useChordMemoContext();

  React.useEffect(() => {
    const chordMemo = read(params.id);
    setMemoChord(chordMemo);
  }, [params.id, read]);

  if (!memoChord) {
    return null;
  }

  const createdAt = new Date(memoChord.createdAt);

  return (
    <div className={'w-full rounded-md border bg-background p-5 shadow-md'}>
      <h6 className={'font-medium'}>{memoChord.title}</h6>
      <p className={'text-right text-xs font-medium text-foreground/60'}>
        作成日時: {createdAt.toLocaleDateString()}{' '}
        <span className="tabular-nums">{createdAt.toLocaleTimeString()}</span>
      </p>
      <div className="py-10">
        <Score
          minWidth={185}
          className={'w-full'}
          data={input2scoreData(memoChord.chords)}
        />
      </div>
    </div>
  );
}
