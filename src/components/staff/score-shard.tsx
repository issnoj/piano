import { StaffLines } from './icons';
import { ScoreShardProps } from './types';
import { ScoreMeasure } from '@/components/staff/score-measure';

export const ScoreShard = ({
  width,
  height,
  translateY,
  measurePropsList,
}: ScoreShardProps) => {
  return (
    <g
      data-type={'shard'}
      data-width={width}
      data-height={height}
      style={{ translate: `0 ${translateY}px` }}
    >
      <StaffLines />
      {measurePropsList.map((props, i) => (
        <ScoreMeasure key={i} {...props} />
      ))}
      {/*<rect width={width} height={height} fill={'gray'} fillOpacity={0} />*/}
    </g>
  );
};
