import React from 'react';
import {
  DoubleFlat,
  DoubleSharpIcon,
  FlatIcon,
  NoteIcon,
  SharpIcon,
} from './icons';
import { StaffNoteProps } from './types';

export const StaffNote = ({
  note,
  translateY,
  noteTranslateX,
  acciTranslateX,
}: StaffNoteProps) => {
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
