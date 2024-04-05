import { StaffNote, StaffNoteProp } from '@/components/staff/staff-note';
import { Chord } from '@/lib/piano/types';
import { NOTE_WIDTH, STAFF_LINE_HEIGHT, STAFF_LINE_ZERO_Y } from './staff';

export type StaffChordProp = {
  chord: Chord;
  staffNoteProps: StaffNoteProp[];
  translateX: number;
  bottom: number;
  fontSize: number;
};

export const StaffChord = ({
  chord,
  staffNoteProps,
  translateX,
  bottom,
  fontSize,
}: StaffChordProp) => {
  return (
    <g
      style={{
        transform: `translateX(${translateX}px)`,
      }}
    >
      {staffNoteProps.map((props, i) => {
        const linePositions = generateLinePositions(props.note.position);
        return (
          <g key={i}>
            {linePositions.map((linePosition, index) => {
              const y = STAFF_LINE_ZERO_Y - linePosition * STAFF_LINE_HEIGHT;
              return (
                <line
                  key={index}
                  y1={y}
                  x2={NOTE_WIDTH}
                  y2={y}
                  stroke="black"
                />
              );
            })}
            <StaffNote {...props} />
          </g>
        );
      })}
      {!!chord.name && (
        <text
          x={NOTE_WIDTH / 2}
          y={bottom}
          fill="black"
          fontSize={fontSize}
          textAnchor="middle"
        >
          {chord.name}
        </text>
      )}
    </g>
  );
};

function generateLinePositions(input: number): number[] {
  // 入力が0.5の倍数でない、あるいは入力が0.5から5.5までの場合、空の配列を返す
  if (input % 0.5 !== 0 || (input >= 0.5 && input <= 5.5)) {
    return [];
  }

  // 入力が0以下の場合、0から入力までの整数の逆順配列を生成
  if (input <= 0) {
    return Array.from({ length: Math.abs(input) + 1 }, (_, i) => -i);
  }

  // 入力が6以上の場合、6から入力までの整数の配列を生成
  return Array.from({ length: input - 5 }, (_, i) => i + 6);
}
