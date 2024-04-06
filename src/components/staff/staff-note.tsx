import { Note } from '@/lib/piano/note';
import React from 'react';
import {
  DoubleFlat,
  DoubleSharpIcon,
  FlatIcon,
  NoteIcon,
  SharpIcon,
} from './icons';

export type StaffNoteProp = {
  note: Note;
  translateY: number;
  noteTranslateX: number;
  acciTranslateX: number;
};

export const StaffNote = ({
  note,
  translateY,
  noteTranslateX,
  acciTranslateX,
}: StaffNoteProp) => {
  const showLine = Number.isInteger(note.position);
  return (
    <g
      style={{
        transform: `translateY(${translateY}px)`,
      }}
    >
      <NoteIcon
        style={{
          transform: `translate(${noteTranslateX}px)`,
        }}
      />
      {showLine && <line y1="9.5" x2="45" y2="9.5" stroke="black" />}
      {note.accidental === 'sharp' && (
        <SharpIcon
          style={{ transform: `translate(${acciTranslateX}px, -9px)` }}
        />
      )}
      {note.accidental === 'flat' && (
        <FlatIcon
          style={{ transform: `translate(${acciTranslateX}px, -18px)` }}
        />
      )}
      {note.accidental === 'dsharp' && (
        <DoubleSharpIcon
          style={{ transform: `translate(${acciTranslateX - 2}px, 0px)` }}
        />
      )}
      {note.accidental === 'dflat' && (
        <DoubleFlat
          style={{ transform: `translate(${acciTranslateX - 8}px, -18px)` }}
        />
      )}
    </g>
  );
};
