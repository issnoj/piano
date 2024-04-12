import { Chord } from '@/lib/piano/types';
import {
  ACCIDENTAL_WIDTH,
  CLEF_WIDTH,
  NOTE_TRANSLATE_X,
  NOTE_WIDTH,
  STAFF_LINE_HEIGHT,
  STAFF_MIN_HEIGHT,
} from './consts';
import { StaffLines } from './icons';
import { StaffChord } from './staff-chord';
import { Note } from '@/lib/piano/note';
import {
  StaffChordProps,
  StaffNoteProps,
  StaffShardProps,
  StaffType,
} from './types';
import { StaffAttributes } from './staff-attributes';

export const StaffShard = ({
  attributesProps,
  chordPropsList,
  width,
  height,
  translateY,
}: StaffShardProps) => {
  return (
    <g
      className="staff-shard"
      data-width={width}
      data-height={height}
      style={{ transform: `translateY(${translateY}px)` }}
    >
      <StaffAttributes {...attributesProps} />
      <StaffLines />
      {chordPropsList.map((props, i) => (
        <StaffChord height={height} key={i} {...props} />
      ))}
      <rect width={width} height={height} fill={'gray'} fillOpacity={0} />
    </g>
  );
};

export function getStaffData({
  keySignature,
  chords,
  fontSize,
}: {
  keySignature?: { fifths: number };
  chords: Chord[];
  fontSize: number;
}): StaffType {
  let width = 0;
  let height = STAFF_MIN_HEIGHT;
  let translateY = 0;
  const margin = 40;

  const shardPropsList: StaffShardProps[] = [];

  shardPropsList.push(
    getStaffShard({
      keySignature,
      chords,
      fontSize,
    }),
  );

  shardPropsList.map((props, i) => {
    if (i > 0) {
      for (let j = 0; j < i; j++) {
        const before = shardPropsList[j];
        props.translateY += before.height + before.translateY + margin;
      }
    }
    width = Math.max(width, props.width);
    height = Math.max(props.height, STAFF_MIN_HEIGHT) + props.translateY;
  });

  return {
    width,
    height,
    translateY,
    shardPropsList,
  };
}

function getStaffShard({
  keySignature,
  chords,
  fontSize,
}: {
  keySignature?: { fifths: number };
  chords: Chord[];
  fontSize: number;
}): StaffShardProps {
  let showClef = true;
  let width = 0;
  let height = STAFF_MIN_HEIGHT;
  let attributesWidth = 0;
  let maxPosition = 0;
  let translateY = 0;

  if (showClef) {
    attributesWidth += CLEF_WIDTH;
  }

  if (keySignature) {
    attributesWidth += keySignature
      ? Math.abs(keySignature.fifths) * 19 + 30
      : 0;
  }

  if (showClef || keySignature) {
    attributesWidth += 0;
  }

  width += attributesWidth;

  const chordPropsList = chords.map((chord) => {
    const staffChord = getStaffChord({ chord, fontSize });
    height = Math.max(height, staffChord.height);
    const prop: Omit<StaffChordProps, 'height'> = {
      chord,
      notePropsList: staffChord.notePropsList,
      fontSize,
      x: width,
      width: staffChord.width,
    };
    width += staffChord.width;
    maxPosition = Math.max(maxPosition, staffChord.maxPosition);
    return prop;
  });

  if (maxPosition > 6) {
    translateY += (maxPosition - 6) * STAFF_LINE_HEIGHT;
  }

  return {
    attributesProps: {
      keySignature,
      showClef,
      width: attributesWidth,
      height,
    },
    chordPropsList,
    width,
    height,
    translateY,
  };
}

function getStaffChord({
  chord,
  fontSize,
}: {
  chord: Chord;
  fontSize: number;
}): {
  notePropsList: StaffNoteProps[];
  width: number;
  height: number;
  maxPosition: number;
} {
  let acciMap = new Map<string, boolean>();
  let noteMap = new Map<string, boolean>();
  let minTranslateX = 0;
  let maxTranslateX = 0;
  let height = 200;
  let maxPosition = 0;

  const sotedNotes = chord.notes.sort(compareNoteByPosition);

  const notePropsList = sotedNotes.map((note) => {
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

    const chordNameHeight = chord.name ? 20 + fontSize * 2.5 : 0;
    height = Math.max(height, translateY + chordNameHeight);

    maxPosition = Math.max(maxPosition, note.position);

    return {
      note,
      translateY,
      noteTranslateX,
      acciTranslateX,
    };
  });

  let noteMargin = 20;
  if (chord.name.length > 4) {
    noteMargin += (chord.name.length * fontSize) / 10;
  }

  const width = NOTE_WIDTH - minTranslateX + maxTranslateX + noteMargin * 2;

  notePropsList.forEach((note) => {
    note.noteTranslateX -= minTranslateX - noteMargin;
    note.acciTranslateX -= minTranslateX - noteMargin;
  });

  return {
    notePropsList,
    width,
    height,
    maxPosition,
  };
}

function compareNoteByPosition(a: Note, b: Note) {
  return a.position - b.position;
}
