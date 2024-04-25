'use client';

import React from 'react';
import { InputChord } from '@/components/memo/input-chord';
import { Chord } from '@/lib/piano/types';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { piano } from '@/lib/piano';
import { useChordMemoContext } from './chord-memo-provider';
import { LoaderCircle, Save } from 'lucide-react';

type State = 'idle' | 'loading';

const formSchema = z.object({
  title: z.string().max(50),
  chords: z.string().min(1),
});

type Props = {
  title: string;
  chords: string;
};

export const FormChordMemo = ({ title, chords }: Props) => {
  const { create } = useChordMemoContext();
  const [state, setState] = React.useState<State>('idle');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      chords,
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    setState('loading');
    setTimeout(() => {
      create({ title: data.title, chords: data.chords, createdAt: Date.now() });
      setState('idle');
    }, 500);
  };

  const handleChangeChords = (chords: Chord[]) => {
    form.setValue('chords', chords.map((chord) => chord.name).join(' '));
  };

  const disabled = form.watch('chords') === '' || state === 'loading';

  return (
    <div className={'w-full rounded-md border bg-background p-5 shadow-md'}>
      <h6 className={'font-medium'}>{title}</h6>
      <Form {...form}>
        <form
          className={'flex flex-col'}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>タイトル</FormLabel>
                <FormControl>
                  <Input
                    type={'text'}
                    placeholder={'メモのタイトルを入力してください'}
                    disabled={state === 'loading'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chords"
            render={({ field }) => (
              <FormItem className={'mt-5'}>
                <FormLabel>
                  コード
                  <span className="ml-1 text-xs text-destructive">*</span>
                </FormLabel>
                <InputChord
                  initialChords={chords ? piano.text2Chords(chords) : []}
                  onChangeChords={handleChangeChords}
                  disabled={state === 'loading'}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className={'mt-20 place-self-end'}
            type="submit"
            disabled={disabled}
          >
            {state === 'loading' ? (
              <LoaderCircle className="mr-2 size-4 animate-spin" />
            ) : (
              <Save className="mr-2 size-4" />
            )}
            新しいメモを作成する
          </Button>
        </form>
      </Form>
    </div>
  );
};
