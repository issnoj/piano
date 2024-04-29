import React from 'react';
import {
  DoubleFlat,
  DoubleSharpIcon,
  FlatIcon,
  NoteIcon,
  SharpIcon,
} from './icons';
import { ScoreNoteheadProps } from './types';

export const ScoreNotehead = ({
  pitch,
  translateY,
  noteheadTranslateX,
  accidentalTranslateX,
  accidentalTranslateY,
}: ScoreNoteheadProps) => {
  return (
    <g
      data-type={'notehead'}
      style={{
        translate: `0 ${translateY}px`,
      }}
    >
      <g
        style={{
          translate: `${noteheadTranslateX}px`,
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
