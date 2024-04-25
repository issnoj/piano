'use client';

import { ChordMemoCard } from '@/components/memo/chord-memo-card';
import { useChordMemoContext } from '@/components/memo/chord-memo-provider';

export const Side = () => {
  const { momoChords } = useChordMemoContext();
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">メモの一覧</h3>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-1">
        {momoChords.map((v, i) => (
          <ChordMemoCard key={v.createdAt} memoChord={v} />
        ))}
      </div>
    </div>
  );
};
