import { cn } from '@/lib/utils';
import { STAFF_LINE_HEIGHT } from './consts';
import { ScoreShard } from './score-shard';
import { getScoreProps } from '@/components/score/utils';
import { ScoreData } from './types';

type Props = {
  id?: string;
  className?: string;
  data: ScoreData;
  size?: number;
  fontSize?: number;
  minWidth?: number;
};

export const Score = ({
  id,
  className,
  data,
  size = 20,
  fontSize = 28,
  minWidth = 0,
}: Props) => {
  const scale = size / STAFF_LINE_HEIGHT;
  const scoreData = getScoreProps({ data, fontSize });
  const height = scoreData.height;
  const width = Math.max(scoreData.width, minWidth);
  return (
    <svg
      id={id}
      className={cn('overflow-visible ring-1', className)}
      width={width * scale}
      height={height * scale}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      {scoreData.shardPropsList.map((props, i) => (
        <ScoreShard key={i} {...props} />
      ))}
      <g style={{ translate: `0 0px` }}>
        <rect
          width={width}
          height={height}
          stroke={'rgba(0,0,255,5)'}
          strokeWidth={0}
        />
      </g>
    </svg>
  );
};
