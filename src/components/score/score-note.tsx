import { ScoreNotehead } from '@/components/score/score-notehead';
import { ScoreNoteProps } from './types';
import React from 'react';

export const ScoreNote = ({
  boundingBox,
  note,
  noteheadPropsList,
  noteLines,
  fontSize,
  translateX,
  textTranslateY,
}: ScoreNoteProps) => {
  return (
    <g
      data-type={'note'}
      data-width={boundingBox.width}
      data-height={boundingBox.height}
      style={{
        translate: `${translateX}px`,
      }}
    >
      {noteheadPropsList.map((props, i) => {
        return <ScoreNotehead key={i} {...props} />;
      })}
      {noteLines.length > 0 && (
        <g data-type={'note-lines'}>
          {noteLines.map((noteLine, index) => {
            return (
              <line
                key={index}
                x1={0}
                y1={noteLine.translateY}
                x2={noteLine.width}
                y2={noteLine.translateY}
                stroke="black"
              />
            );
          })}
        </g>
      )}
      {!!note.name && (
        <g
          data-type={'note-text'}
          style={{
            translate: `${(boundingBox.width + boundingBox.left) / 2 - boundingBox.left}px ${textTranslateY}px`,
          }}
        >
          <text
            fill="black"
            fontSize={fontSize}
            textAnchor="middle"
            dominantBaseline={'middle'}
          >
            {note.name}
          </text>
        </g>
      )}
      <g style={{ translate: `${-boundingBox.left}px ${-boundingBox.top}px` }}>
        <rect
          width={boundingBox.width + boundingBox.left}
          height={boundingBox.height + boundingBox.top}
          fill={'red'}
          stroke={'red'}
          strokeWidth={0}
          fillOpacity={0}
        />
      </g>
    </g>
  );
};
