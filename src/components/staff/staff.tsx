import { cn } from '@/lib/utils';
import { StaffNoteProp } from '@/components/staff/staff-note';
import { StaffChord } from '@/components/staff/staff-chord';
import { Chord } from '@/lib/piano/types';
import { FlatIcon, SharpIcon } from './icons';
import { Note } from '@/lib/piano/note';

function compareNoteByPosition(a: Note, b: Note) {
  return a.position - b.position;
}

export const STAFF_LINE_ZERO_Y = 140;
export const STAFF_LINE_HEIGHT = 20;
const ACCIDENTAL_WIDTH = 16;
const NOTE_TRANSLATE_X = 28;
export const NOTE_WIDTH = 45;

type Props = {
  id?: string;
  className?: string;
  chords?: Chord[];
  size?: number;
  height?: number;
  noteAreaWidth?: number;
  fontSize?: number;
  keySignature?: { fifths: number };
  minWidth?: number;
};

export const Staff = ({
  id,
  className,
  chords = [],
  size = 12,
  height = 144,
  noteAreaWidth = 100,
  fontSize = 28,
  keySignature,
  minWidth = 0,
}: Props) => {
  const scale = size / STAFF_LINE_HEIGHT;
  const lineTop = 39.5;
  let translateX = 0;
  let bottom = 0;
  const clef = {
    x: 14,
    y: 0,
    width: 50,
  };
  const clefAreaWidth = clef.x + clef.width;
  translateX += clefAreaWidth;

  const keySignatureWidth = keySignature
    ? Math.abs(keySignature.fifths) * 19
    : 0;
  translateX += keySignatureWidth + 50;

  const staffChordProps = chords.map((chord) => {
    const staffChord = getStaffChord({ chord, noteAreaWidth, fontSize });
    bottom = Math.max(bottom, staffChord.bottom);
    const prop = {
      chord,
      staffNoteProps: staffChord.staffNoteProps,
      translateX: translateX,
      bottom,
    };
    translateX += staffChord.areaWidth;
    return prop;
  });

  height = Math.max(bottom, height);

  const width = Math.max(translateX, minWidth);

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
        d="M31.8784 1.00114C26.4514 0.860239 20.1044 13.8191 20.3154 25.3761C20.3644 28.8961 21.4754 36.0351 23.0964 45.0011C12.8734 55.5821 1.00244 66.4411 1.00244 80.6891C0.839444 93.7461 8.81944 110.381 27.7524 110.221C30.6584 110.201 33.2734 109.841 35.5964 109.221C37.3274 118.711 38.4784 126.201 38.4714 129.661C38.5324 143.301 20.6114 144.651 19.7524 136.811C23.5294 136.681 26.5344 133.681 26.5344 129.971C26.5344 126.181 23.3964 123.091 19.5024 123.091C17.3614 123.091 15.4534 124.031 14.1594 125.501C14.1294 125.531 14.0944 125.561 14.0654 125.591C13.7734 125.901 13.5274 126.271 13.2844 126.691C12.4864 128.041 11.9684 129.981 11.9404 132.751C11.9404 144.171 40.8154 151.521 40.8154 129.001C40.8604 125.971 39.5574 118.281 37.6594 108.591C58.2624 101.141 53.0864 70.5511 34.1284 70.4071C32.6584 70.4221 31.2414 70.5931 29.8784 70.9391C28.7984 65.7421 27.7564 60.6981 26.8464 56.0631C34.0454 48.9921 40.3314 39.8391 40.1904 22.9701C40.2124 10.8561 36.1764 1.14214 31.8784 1.00114ZM33.1594 12.7201C35.6154 12.4831 37.5654 14.7631 37.5654 19.7821C37.7644 28.4021 31.7254 35.9301 24.5344 43.5011C23.8464 39.3541 23.3954 35.9941 23.3464 34.0011C23.5504 20.5351 29.0654 13.1151 33.1594 12.7201ZM25.4404 57.4071C26.3174 61.9221 27.2644 66.6791 28.2214 71.4701C15.6734 75.9341 9.65145 93.4241 27.4404 101.251C16.5974 92.0201 21.9344 81.0931 29.7524 79.1891C31.7184 89.0051 33.6384 98.6911 35.1904 107.061C33.0834 107.801 30.6244 108.231 27.7524 108.251C20.5714 108.251 6.22144 103.681 6.22144 86.3761C6.22144 71.8821 16.2684 65.9921 25.4404 57.4071ZM31.5344 78.8761C31.8474 78.8571 32.1864 78.8651 32.5024 78.8761C45.5654 78.8761 50.4924 99.6211 37.1904 106.251C35.5354 97.9311 33.5284 88.3911 31.5344 78.8761Z"
        fill="black"
        stroke="black"
        style={{ transform: `translate(${clef.x}px, ${clef.y}px)` }}
      />
      {keySignature && (
        <KeySignature translateX={clef.x + clef.width + 20} {...keySignature} />
      )}
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

const KeySignature = ({
  translateX,
  fifths,
}: {
  translateX: number;
  fifths: number;
}) => {
  const count = Math.abs(fifths);
  const flats = [53, 20.5, 60, 33, 73, 40, 80];
  const sharps = [21, 50, 11, 41, 71, 32, 61];

  if (fifths < 0) {
    return (
      <g>
        {[...Array(count)].map((_, i) => (
          <FlatIcon
            key={i}
            style={{
              transform: `translate(${translateX + i * 20}px, ${flats[i]}px)`,
            }}
          />
        ))}
      </g>
    );
  }

  return (
    <g>
      {[...Array(count)].map((_, i) => (
        <SharpIcon
          key={i}
          style={{
            transform: `translate(${translateX + i * 20}px, ${sharps[i]}px)`,
          }}
        />
      ))}
    </g>
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
  bottom: number;
} => {
  let acciMap = new Map<string, boolean>();
  let noteMap = new Map<string, boolean>();
  let minTranslateX = 0;
  let maxTranslateX = 0;
  let bottom = 200;

  const sotedNotes = chord.notes.sort(compareNoteByPosition);

  const staffNoteProps = sotedNotes.map((note) => {
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

  const areaWidth = noteAreaWidth - minTranslateX + maxTranslateX;

  return {
    staffNoteProps,
    areaWidth,
    bottom,
  };
};
