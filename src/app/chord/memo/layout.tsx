import type { Metadata } from 'next';
import React from 'react';
import { Side } from './side';
import { ChordMemoProvider } from '@/components/memo/chord-memo-provider';

export const metadata: Metadata = {
  title: 'コードのメモ帳 | Pianote',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold">コードのメモ帳</h2>
      <div className="flex flex-col gap-8 xl:grid xl:grid-cols-[1fr,300px]">
        <ChordMemoProvider>
          <div className="grow">{children}</div>
          <Side />
        </ChordMemoProvider>
      </div>
    </div>
  );
}
