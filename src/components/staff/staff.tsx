import { cn } from '@/lib/utils';
import { Chord } from '@/lib/piano/types';
import { STAFF_LINE_HEIGHT } from './consts';
import { StaffShard, getStaffData } from './staff-shard';

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

export const Staff = ({
  id,
  className,
  chords = [],
  size = 20,
  fontSize = 28,
  keySignature,
  minWidth = 0,
}: Props) => {
  const scale = size / STAFF_LINE_HEIGHT;
  const staffData = getStaffData({
    keySignature,
    chords,
    fontSize,
  });

  const height = staffData.height;
  const width = Math.max(staffData.width, minWidth);

  return (
    <svg
      id={id}
      className={cn('overflow-visible', className)}
      width={width * scale}
      height={height * scale}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      {staffData.shardPropsList.map((props, i) => (
        <StaffShard key={i} {...props} />
      ))}
    </svg>
  );
};
