'use client';

import React from 'react';

const KEY = 'memo-chord';

export type MemoChord = {
  id: string;
  title: string;
  chords: string;
  createdAt: number;
};

type ChordMemoContextType = {
  momoChords: MemoChord[];
  create: (data: Omit<MemoChord, 'id'>) => void;
  readAll: () => MemoChord[];
  remove: (id: string) => void;
  read: (id: string) => MemoChord | undefined;
};

const ChordMemoContext = React.createContext<ChordMemoContextType | null>(null);

export const useChordMemoContext = () => {
  const context = React.useContext(ChordMemoContext);
  if (context === null) {
    throw new Error();
  }
  return context;
};

type ChordMemoContextProviderProps = {
  children: React.ReactNode;
};

export const ChordMemoProvider = ({
  children,
}: ChordMemoContextProviderProps) => {
  const [momoChords, setMomoChords] = React.useState<MemoChord[]>([]);

  const readAll = React.useCallback<
    ChordMemoContextType['readAll']
  >((): MemoChord[] => {
    const data = localStorage.getItem(KEY) || '[]';
    return JSON.parse(data);
  }, []);

  const create = React.useCallback<ChordMemoContextType['create']>(
    (data) => {
      const newData = [{ ...data, id: crypto.randomUUID() }, ...readAll()];
      localStorage.setItem(KEY, JSON.stringify(newData));
      setMomoChords(newData);
    },
    [readAll],
  );

  // const search = React.useCallback(
  //   (title: string) => {
  //     const allData = readAll();
  //     return allData.find((v) => new RegExp(`${title}`).test(v.title));
  //   },
  //   [readAll],
  // );

  const read = React.useCallback(
    (id: string) => {
      const allData = readAll();
      return allData.find((v) => v.id === id);
    },
    [readAll],
  );

  React.useEffect(() => {
    setMomoChords(readAll());
  }, [readAll]);

  //   const update = React.useCallback((key: string, value: string) => {
  //     localStorage.setItem(`${KEY}${key}`, value);
  //   }, []);

  const remove = React.useCallback(
    (id: string) => {
      const newData = readAll().filter((v) => v.id !== id);
      localStorage.setItem(KEY, JSON.stringify(newData));
      setMomoChords(newData);
    },
    [readAll],
  );

  return (
    <ChordMemoContext.Provider
      value={{ momoChords, create, readAll, remove, read }}
    >
      {children}
    </ChordMemoContext.Provider>
  );
};
