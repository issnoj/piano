import { cn } from '@/lib/utils';
import { Chord } from '@/lib/piano/types';
import { STAFF_LINE_HEIGHT } from './consts';
import { ScoreShard } from './score-shard';
import { getScoreData } from '@/components/staff/utils';

type Props = {
  id?: string;
  className?: string;
  chords?: Chord[];
  size?: number;
  noteAreaWidth?: number;
  fontSize?: number;
  keySignature?: { fifths: number };
  minWidth?: number;
  minHeight?: number;
  showClef?: boolean;
};

export const Score = ({
  id,
  className,
  chords = [],
  size = 20,
  fontSize = 28,
  keySignature,
  minWidth = 0,
}: Props) => {
  const scale = size / STAFF_LINE_HEIGHT;
  const scoreData = getScoreData({
    keySignature,
    chords,
    fontSize,
  });

  const height = scoreData.height;
  const width = Math.max(scoreData.width, minWidth);

  return (
    <svg
      id={id}
      className={cn('overflow-visible', className)}
      width={width * scale}
      height={height * scale}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      {scoreData.shardPropsList.map((props, i) => (
        <ScoreShard key={i} {...props} />
      ))}
    </svg>
  );
};
