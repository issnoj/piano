import { Chord } from '@/lib/piano/types';
import {
  ScoreNoteProps,
  ScoreNoteListProps,
  ScoreShardProps,
  ScoreType,
  NoteLine,
} from '@/components/staff/types';
import {
  ACCIDENTAL_WIDTH,
  CLEF_WIDTH,
  NOTE_LIST_GAP,
  NOTE_TRANSLATE_X,
  NOTEHEAD_LINE_WIDTH,
  NOTEHEAD_WIDTH,
  STAFF_LINE_HEIGHT,
  STAFF_MIN_HEIGHT,
} from '@/components/staff/consts';
import { Pitch } from '@/lib/piano/pitch';

export function getScoreData({
  keySignature,
  chords,
  fontSize,
}: {
  keySignature?: { fifths: number };
  chords: Chord[];
  fontSize: number;
}): ScoreType {
  let width = 0;
  let height = STAFF_MIN_HEIGHT;
  let translateY = 0;
  const margin = 40;

  const shardPropsList: ScoreShardProps[] = [];

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
}): ScoreShardProps {
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

  width += NOTE_LIST_GAP / 2;

  const noteListPropsList = chords.map((chord) => {
    width += NOTE_LIST_GAP / 2;
    const scoreNoteList = getScoreNoteList({ chord, fontSize });
    height = Math.max(height, scoreNoteList.height);
    const prop: Omit<ScoreNoteListProps, 'height'> = {
      chord,
      notePropsList: scoreNoteList.notePropsList,
      fontSize,
      translateX: width - scoreNoteList.minTranslateX,
      width: scoreNoteList.width,
      noteLines: scoreNoteList.noteLines,
      minTranslateX: scoreNoteList.minTranslateX,
    };
    width += scoreNoteList.width + NOTE_LIST_GAP / 2;
    maxPosition = Math.max(maxPosition, scoreNoteList.maxPosition);
    return prop;
  });

  if (maxPosition > 6) {
    translateY += (maxPosition - 6) * STAFF_LINE_HEIGHT;
  }

  return {
    width,
    height,
    translateY,
    measurePropsList: [
      {
        width,
        height,
        attributesProps: {
          keySignature,
          showClef,
          width: attributesWidth,
          height,
        },
        noteListPropsList,
      },
    ],
  };
}

function getScoreNoteList({
  chord,
  fontSize,
}: {
  chord: Chord;
  fontSize: number;
}): {
  notePropsList: ScoreNoteProps[];
  width: number;
  height: number;
  maxPosition: number;
  noteLines: NoteLine[];
  minTranslateX: number;
} {
  let acciMap = new Map<string, boolean>();
  let noteMap = new Map<string, boolean>();
  let minTranslateX = 0;
  let maxTranslateX = 0;
  let height = 200;
  let maxPosition = 0;
  const noteLineRecords: Record<NoteLine['position'], NoteLine> = {};
  const pitches = chord.pitches.sort(compareNoteByPosition);

  const notePropsList = pitches.map((pitch) => {
    const position = pitch.position;
    const translateY = STAFF_LINE_HEIGHT * 6.5 - position * STAFF_LINE_HEIGHT;

    // 臨時記号
    let accidentalTranslateX = 0;
    let accidentalTranslateY = 0;
    if (pitch.accidental) {
      let acciNumber = 1;
      while (
        acciMap.get(`${acciNumber},${position - 0.5}`) ||
        acciMap.get(`${acciNumber},${position - 1}`) ||
        acciMap.get(`${acciNumber},${position - 1.5}`)
      ) {
        acciNumber++;
      }
      acciMap.set(`${acciNumber},${position}`, true);
      const accidental = getAccidental(pitch.accidental);
      accidentalTranslateX =
        -5 -
        acciNumber * ACCIDENTAL_WIDTH +
        (ACCIDENTAL_WIDTH - accidental.width) / 2;
      accidentalTranslateY = accidental.translateY;
    }

    // たま
    let noteheadNumber = 0;
    if (noteMap.get(`0,${position - 0.5}`)) {
      noteheadNumber++;
    }
    noteMap.set(`${noteheadNumber},${position}`, true);
    const noteTranslateX = noteheadNumber * NOTE_TRANSLATE_X;

    minTranslateX = Math.min(minTranslateX, accidentalTranslateX);
    maxTranslateX = Math.max(maxTranslateX, noteTranslateX);

    const chordNameHeight = chord.name ? 20 + fontSize * 2.5 : 0;
    height = Math.max(height, translateY + chordNameHeight);

    maxPosition = Math.max(maxPosition, position);

    // ライン
    generateLinePositions(position).forEach((position) => {
      if (noteLineRecords[position]) {
        noteLineRecords[position].number = Math.max(
          noteLineRecords[position].number,
          noteheadNumber,
        );
      } else {
        noteLineRecords[position] = {
          position,
          number: noteheadNumber,
        };
      }
    });

    return {
      pitch,
      noteTranslateX,
      translateY,
      accidentalTranslateX,
      accidentalTranslateY,
      position,
    };
  });

  const width =
    NOTEHEAD_WIDTH -
    minTranslateX +
    maxTranslateX +
    (NOTEHEAD_LINE_WIDTH - NOTEHEAD_WIDTH);

  const noteLines = Object.values(noteLineRecords);
  if (noteLines.length > 0) {
    minTranslateX -= (NOTEHEAD_LINE_WIDTH - NOTEHEAD_WIDTH) / 2;
  }

  return {
    notePropsList,
    width,
    height,
    maxPosition,
    noteLines,
    minTranslateX,
  };
}

function getAccidental(accidental: Pitch['accidental']) {
  switch (accidental) {
    case 'flat':
      return {
        width: 13,
        translateY: -18,
      };
    case 'dflat':
      return {
        width: 26,
        translateY: -18,
      };
    case 'sharp':
      return {
        width: 16,
        translateY: -9,
      };
    case 'dsharp':
      return {
        width: 20,
        translateY: 0,
      };
  }
  return {
    width: 0,
    translateY: 0,
  };
}

function compareNoteByPosition(a: Pitch, b: Pitch) {
  return a.position - b.position;
}

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
