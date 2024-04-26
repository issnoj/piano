import { ScoreNote } from '@/components/staff/score-note';
import {
  NOTE_TRANSLATE_X,
  NOTEHEAD_LINE_WIDTH,
  NOTEHEAD_WIDTH,
  STAFF_LINE_HEIGHT,
  STAFF_LINE_ZERO_Y,
} from './consts';
import { ScoreNoteListProps } from './types';
import React from 'react';

export const ScoreNoteList = ({
  chord,
  notePropsList,
  noteLines,
  fontSize,
  translateX,
  width,
  height,
  minTranslateX,
}: ScoreNoteListProps) => {
  return (
    <g
      data-type={'note-list'}
      data-width={width}
      data-height={height}
      style={{
        translate: `${translateX}px`,
      }}
    >
      {notePropsList.map((props, i) => {
        return <ScoreNote key={i} {...props} />;
      })}
      {noteLines.length > 0 && (
        <g data-type={'lines'}>
          {noteLines.map((noteLine, index) => {
            const y = STAFF_LINE_ZERO_Y - noteLine.position * STAFF_LINE_HEIGHT;
            const x1 = -(NOTEHEAD_LINE_WIDTH - NOTEHEAD_WIDTH) / 2;
            const x2 =
              NOTE_TRANSLATE_X * noteLine.number +
              NOTEHEAD_WIDTH +
              (NOTEHEAD_LINE_WIDTH - NOTEHEAD_WIDTH) / 2;
            return (
              <line key={index} x1={x1} y1={y} x2={x2} y2={y} stroke="black" />
            );
          })}
        </g>
      )}
      {!!chord.name && (
        <g
          data-type={'text'}
          style={{ translate: `${minTranslateX + width / 2}px ${height}px` }}
        >
          <text
            fill="black"
            fontSize={fontSize}
            textAnchor="middle"
            dominantBaseline={'middle'}
          >
            {chord.name}
          </text>
        </g>
      )}
      <g style={{ translate: `${minTranslateX}px` }}>
        <rect
          width={width}
          height={height}
          fill={'red'}
          stroke={'red'}
          strokeWidth={0}
          fillOpacity={0}
        />
      </g>
    </g>
  );
};
