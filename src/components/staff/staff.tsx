import { cn } from '@/lib/utils';
import { StaffNoteProp } from '@/components/staff/staff-note';
import { StaffChord } from '@/components/staff/staff-chord';
import { Chord } from '@/lib/piano/types';

export const STAFF_LINE_ZERO_Y = 140;
export const STAFF_LINE_HEIGHT = 20;
const ACCIDENTAL_WIDTH = 16;
const NOTE_TRANSLATE_X = 28;
const STAFF_LEFT_WIDTH = 120;
export const NOTE_WIDTH = 45;

type Props = {
  id?: string;
  className?: string;
  chords?: Chord[];
  size?: number;
  height?: number;
  noteAreaWidth?: number;
  fontSize?: number;
};

export const Staff = ({
  id,
  className,
  chords = [],
  size = 12,
  height = 220,
  noteAreaWidth = 100,
  fontSize = 28,
}: Props) => {
  const scale = size / STAFF_LINE_HEIGHT;
  const lineTop = 39.5;
  let width = STAFF_LEFT_WIDTH;
  let adjustTranslateX = STAFF_LEFT_WIDTH;
  let bottom = 0;

  const staffChordProps = chords.map((chord, index) => {
    const staffChord = getStaffChord({ chord, noteAreaWidth, fontSize });
    width += staffChord.areaWidth;
    adjustTranslateX += staffChord.adjustTranslateX;
    bottom = Math.max(bottom, staffChord.bottom);
    return {
      chord,
      staffNoteProps: staffChord.staffNoteProps,
      translateX: adjustTranslateX + index * noteAreaWidth,
      bottom,
    };
  });

  height = Math.max(bottom, height);

  return (
    <svg
      id={id}
      className={cn('overflow-visible', className)}
      width={width * scale}
      height={height * scale}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      {staffChordProps.map((props, i) => (
        <StaffChord fontSize={fontSize} key={i} {...props} />
      ))}
      <path
        d="M44.8784 9.00114C39.4514 8.86024 33.1044 21.8191 33.3154 33.3761C33.3644 36.8961 34.4754 44.0351 36.0964 53.0011C25.8734 63.5821 14.0024 74.4411 14.0024 88.6891C13.8394 101.746 21.8194 118.381 40.7524 118.221C43.6584 118.201 46.2734 117.841 48.5964 117.221C50.3274 126.711 51.4784 134.201 51.4714 137.661C51.5324 151.301 33.6114 152.651 32.7524 144.811C36.5294 144.681 39.5344 141.681 39.5344 137.971C39.5344 134.181 36.3964 131.091 32.5024 131.091C30.3614 131.091 28.4534 132.031 27.1594 133.501C27.1294 133.531 27.0944 133.561 27.0654 133.591C26.7734 133.901 26.5274 134.271 26.2844 134.691C25.4864 136.041 24.9684 137.981 24.9404 140.751C24.9404 152.171 53.8154 159.521 53.8154 137.001C53.8604 133.971 52.5574 126.281 50.6594 116.591C71.2624 109.141 66.0864 78.5511 47.1284 78.4071C45.6584 78.4221 44.2414 78.5931 42.8784 78.9391C41.7984 73.7421 40.7564 68.6981 39.8464 64.0631C47.0454 56.9921 53.3314 47.8391 53.1904 30.9701C53.2124 18.8561 49.1764 9.14214 44.8784 9.00114ZM46.1594 20.7201C48.6154 20.4831 50.5654 22.7631 50.5654 27.7821C50.7644 36.4021 44.7254 43.9301 37.5344 51.5011C36.8464 47.3541 36.3954 43.9941 36.3464 42.0011C36.5504 28.5351 42.0654 21.1151 46.1594 20.7201ZM38.4404 65.4071C39.3174 69.9221 40.2644 74.6791 41.2214 79.4701C28.6734 83.9341 22.6514 101.424 40.4404 109.251C29.5974 100.02 34.9344 89.0931 42.7524 87.1891C44.7184 97.0051 46.6384 106.691 48.1904 115.061C46.0834 115.801 43.6244 116.231 40.7524 116.251C33.5714 116.251 19.2214 111.681 19.2214 94.3761C19.2214 79.8821 29.2684 73.9921 38.4404 65.4071ZM44.5344 86.8761C44.8474 86.8571 45.1864 86.8651 45.5024 86.8761C58.5654 86.8761 63.4924 107.621 50.1904 114.251C48.5354 105.931 46.5284 96.3911 44.5344 86.8761Z"
        fill="black"
        stroke="black"
      />
      {[...Array(5)].map((_, i) => (
        <line
          key={i}
          y1={lineTop + STAFF_LINE_HEIGHT * i}
          x2="100%"
          y2={lineTop + STAFF_LINE_HEIGHT * i}
          stroke="black"
        />
      ))}
      <line
        x1="0.5"
        y1={lineTop - 0.5}
        x2="0.5"
        y2={STAFF_LINE_HEIGHT * 6}
        stroke="black"
      />
      <line
        x1="100%"
        y1={lineTop - 0.5}
        x2="100%"
        y2={STAFF_LINE_HEIGHT * 6}
        stroke="black"
      />
    </svg>
  );
};

const getStaffChord = ({
  chord,
  noteAreaWidth,
  fontSize,
}: {
  chord: Chord;
  noteAreaWidth: number;
  fontSize: number;
}): {
  staffNoteProps: StaffNoteProp[];
  areaWidth: number;
  adjustTranslateX: number;
  bottom: number;
} => {
  let acciMap = new Map<string, boolean>();
  let noteMap = new Map<string, boolean>();
  let minTranslateX = 0;
  let maxTranslateX = 0;
  let bottom = 200;

  const staffNoteProps = chord.notes.map((note) => {
    const translateY =
      STAFF_LINE_HEIGHT * 6.5 - note.position * STAFF_LINE_HEIGHT;

    let acciTranslateX = 0;
    if (note.accidental) {
      let acciPositionX = 1;
      while (
        acciMap.get(`${acciPositionX},${note.position - 0.5}`) ||
        acciMap.get(`${acciPositionX},${note.position - 1}`) ||
        acciMap.get(`${acciPositionX},${note.position - 1.5}`)
      ) {
        acciPositionX++;
      }
      acciMap.set(`${acciPositionX},${note.position}`, true);
      acciTranslateX = -acciPositionX * ACCIDENTAL_WIDTH;
    }

    let notePositionX = 0;
    if (noteMap.get(`0,${note.position - 0.5}`)) {
      notePositionX++;
    }
    noteMap.set(`${notePositionX},${note.position}`, true);
    const noteTranslateX = notePositionX * NOTE_TRANSLATE_X;

    minTranslateX = Math.min(minTranslateX, acciTranslateX);
    maxTranslateX = Math.max(maxTranslateX, noteTranslateX);

    const chordNameHeight = chord.name ? fontSize * 2.5 : 0;
    bottom = Math.max(bottom, translateY + chordNameHeight);

    return {
      note,
      translateY,
      noteTranslateX,
      acciTranslateX,
    };
  });

  const adjustTranslateX = -minTranslateX;

  const areaWidth = noteAreaWidth - minTranslateX + maxTranslateX;

  return {
    staffNoteProps,
    adjustTranslateX,
    areaWidth,
    bottom,
  };
};
