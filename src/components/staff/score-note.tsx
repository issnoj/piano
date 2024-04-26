import React from 'react';
import {
  DoubleFlat,
  DoubleSharpIcon,
  FlatIcon,
  NoteIcon,
  SharpIcon,
} from './icons';
import { ScoreNoteProps } from './types';

export const ScoreNote = ({
  pitch,
  translateY,
  noteTranslateX,
  accidentalTranslateX,
  accidentalTranslateY,
}: ScoreNoteProps) => {
  return (
    <g
      data-type={'note'}
      style={{
        translate: `0 ${translateY}px`,
      }}
    >
      <g
        style={{
          translate: `${noteTranslateX}px`,
        }}
      >
        <NoteIcon />
      </g>
      {pitch.accidental && (
        <g
          data-type={'accidental'}
          style={{
            translate: `${accidentalTranslateX}px ${accidentalTranslateY}px`,
          }}
        >
          {pitch.accidental === 'sharp' && <SharpIcon />}
          {pitch.accidental === 'flat' && <FlatIcon />}
          {pitch.accidental === 'dsharp' && <DoubleSharpIcon />}
          {pitch.accidental === 'dflat' && <DoubleFlat />}
        </g>
      )}
    </g>
  );
};
