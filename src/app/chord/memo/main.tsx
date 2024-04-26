'use client';

import { FormChordMemo } from '@/components/memo/form-chord-memo';
import React from 'react';

export const Main = () => {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">メモの作成</h3>
      <FormChordMemo title={''} chords={'e6'} />
    </div>
  );
};
