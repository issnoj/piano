'use client';

import { StepValue, Scale, ScaleTypeId } from '@/lib/piano/types';
import { Filter } from '../filter';
import { piano } from '@/lib/piano';
import { Score } from '@/components/score/score';
import React from 'react';
import { cn } from '@/lib/utils';

export type FilterState = {
  scaleTypes: ScaleTypeId[];
  baseNoteIds: StepValue[];
  accidentals: ('flat' | 'sharp' | '')[];
};

export const ScalePageContent = () => {
  const [filterState, setFilterState] = React.useState<FilterState>({
    scaleTypes: ['major', 'harmonicMinor', 'melodicMinor'],
    baseNoteIds: ['C'],
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
      if (['B', 'A'].includes(baseNoteId)) {
        octave = 3;
      }
      filterState.accidentals.forEach((accidental) => {
        const pianoNote = piano.pitch({
          stepValue: baseNoteId,
          octave,
          accidental: accidental === '' ? undefined : accidental,
        });
        filterState.scaleTypes.forEach((scaleTypeId) => {
          const scale = piano.scale(pianoNote, scaleTypeId);
          if (scale) {
            scales.push(scale);
          }
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
            <Score
              className="p-1"
              size={8}
              fontSize={32}
              data={{
                shards: [
                  {
                    measures: [
                      {
                        attributes: {
                          keySignature: { fifths: 0 },
                          showClef: true,
                        },
                        content: {
                          notes: scale.notes.map((note) => ({
                            pitches: [note],
                            name: note.getName('en'),
                          })),
                        },
                      },
                    ],
                  },
                ],
              }}
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
        'border-l-8 border-gray-600/50 bg-gradient-to-r from-gray-50 from-50% px-4 py-2',
        scale.type.id === 'minor' && 'border-orange-600/50 from-orange-50',
        scale.type.id === 'harmonicMinor' &&
          'border-emerald-600/50 from-emerald-50',
        scale.type.id === 'melodicMinor' &&
          ' border-purple-600/50 from-purple-50',
      )}
    >
      <div className="flex gap-4">
        <Score
          size={7}
          minWidth={250}
          data={{
            shards: [
              {
                measures: [
                  {
                    attributes: {
                      keySignature: { fifths: scale.fifths },
                      showClef: true,
                    },
                    content: {
                      notes: [],
                    },
                  },
                ],
              },
            ],
          }}
        />
        <div>
          <div>
            <span className="font-bold">{scale.shortName}</span>
            {scale.type.id !== 'major' ? (
              <span className="ml-2 text-xs">({scale.type.name})</span>
            ) : null}
          </div>
          <div className="ml-2 inline-flex flex-col gap-2 text-xs">
            <span>{scale.nameEn}</span>
            <span>{scale.nameDe}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
