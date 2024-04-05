'use client';

import { BaseNoteId, Scale, ScaleTypeId } from '@/lib/piano/types';
import { Filter } from './filter';
import { piano } from '@/lib/piano';
import { Staff } from '@/components/staff/staff';
import React from 'react';
import { cn } from '@/lib/utils';

export type FilterState = {
  scaleTypes: ScaleTypeId[];
  baseNoteIds: BaseNoteId[];
  accidentals: ('flat' | 'sharp' | '')[];
};

export const ScalePageContent = () => {
  const [filterState, setFilterState] = React.useState<FilterState>({
    scaleTypes: ['major', 'harmonicMinor', 'melodicMinor'],
    baseNoteIds: ['c'],
    accidentals: ['', 'flat', 'sharp'],
  });

  const handleChangeScaleTypes = React.useCallback(
    (value: FilterState['scaleTypes']) => {
      setFilterState((prev) => ({
        ...prev,
        scaleTypes: value,
      }));
    },
    [],
  );

  const handleChangeNotes = React.useCallback(
    (value: FilterState['baseNoteIds']) => {
      setFilterState((prev) => ({
        ...prev,
        baseNoteIds: value,
      }));
    },
    [],
  );

  const handleChangeAccidental = React.useCallback(
    (value: FilterState['accidentals']) => {
      setFilterState((prev) => ({
        ...prev,
        accidentals: value,
      }));
    },
    [],
  );

  const scales = ((): Scale[] => {
    let scales: Scale[] = [];
    filterState.baseNoteIds.forEach((baseNoteId) => {
      let octave = 4;
      if (['b', 'a'].includes(baseNoteId)) {
        octave = 3;
      }
      filterState.accidentals.forEach((accidental) => {
        const pianoNote = piano.note({
          baseNoteId,
          octave,
          accidental: accidental === '' ? undefined : accidental,
        });
        filterState.scaleTypes.forEach((scaleTypeId) => {
          scales.push(piano.scale(pianoNote, scaleTypeId));
        });
      });
    });
    return scales;
  })();

  return (
    <>
      <Filter
        initialState={filterState}
        onChangeScaleTypes={handleChangeScaleTypes}
        onChangeNotes={handleChangeNotes}
        onChangeAccidental={handleChangeAccidental}
      />
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 xl:grid-cols-2 2xl:grid-cols-3">
        {scales.map((scale, i) => (
          <div key={i} className="flex flex-col gap-1">
            <ScaleHeader scale={scale} />
            <Staff
              className="p-1"
              size={8}
              fontSize={32}
              chords={scale.notes.map((note) => ({
                notes: [note],
                name: note.getName('en'),
              }))}
            />
          </div>
        ))}
      </div>
    </>
  );
};

const ScaleHeader = ({ scale }: { scale: Scale }) => {
  return (
    <div
      className={cn(
        'border-l-8 border-gray-600/50 bg-gradient-to-r from-gray-50 from-50% px-2 py-1',
        scale.type.id === 'minor' && 'border-orange-600/50 from-orange-50',
        scale.type.id === 'harmonicMinor' &&
          'border-emerald-600/50 from-emerald-50',
        scale.type.id === 'melodicMinor' &&
          ' border-purple-600/50 from-purple-50',
      )}
    >
      <span className="mr-2 font-bold">{scale.shortName}</span>
      <div className="inline-flex gap-2 text-xs">
        {scale.type.id !== 'major' ? <span>({scale.type.name})</span> : null}
        <span>{scale.nameEn}</span>
        <span>{scale.nameDe}</span>
      </div>
    </div>
  );
};
