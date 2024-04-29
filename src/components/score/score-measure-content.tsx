import { ScoreNote } from './score-note';
import { ScoreMeasureContentProps } from './types';

export const ScoreMeasureContent = ({
  boundingBox,
  translateX,
  notePropsList,
}: ScoreMeasureContentProps) => {
  return (
    <g
      data-type="measure-content"
      data-width={boundingBox.width}
      data-height={boundingBox.height}
      style={{ translate: `${translateX}px` }}
    >
      {notePropsList.map((props, i) => (
        <ScoreNote key={i} {...props} />
      ))}
      <g style={{ translate: `0 ${-boundingBox.top}px` }}>
        <rect
          width={boundingBox.width + boundingBox.left}
          height={boundingBox.height + boundingBox.top}
          stroke={'rgba(0,0,255,0.5)'}
          strokeWidth={0}
        />
      </g>
    </g>
  );
};
