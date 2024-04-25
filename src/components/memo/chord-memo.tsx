import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

type Props = {
  title: string;
  chords: string;
};

export const ChordMemo = ({ title, chords }: Props) => {
  return (
    <div className={'w-full rounded-md border bg-background p-5 shadow-md'}>
      <h6 className={'font-medium'}>{title}</h6>
      <Button className={'mt-20 place-self-end'} type="submit">
        <Save className="mr-2 size-4" />
        新しいメモを作成する
      </Button>
    </div>
  );
};
