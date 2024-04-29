import { StaffLines } from './icons';
import { ScoreShardProps } from './types';
import { ScoreMeasure } from '@/components/score/score-measure';

export const ScoreShard = ({
  boundingBox,
  translateY,
  measurePropsList,
}: ScoreShardProps) => {
  return (
    <g
      data-type={'shard'}
      data-width={boundingBox.width + boundingBox.left}
      data-height={boundingBox.height + boundingBox.top}
      style={{ translate: `0 ${translateY}px` }}
    >
      <StaffLines.icon />
      {measurePropsList.map((props, i) => (
        <ScoreMeasure key={i} {...props} />
      ))}
      <g style={{ translate: `-10px ${-boundingBox.top - 10}px` }}>
        <rect
          width={boundingBox.width + boundingBox.left + 20}
          height={boundingBox.height + boundingBox.top + 20}
          stroke={'rgba(255,0,0,5)'}
          strokeWidth={0}
        />
      </g>
    </g>
  );
};
