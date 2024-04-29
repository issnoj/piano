import {
  ScoreNoteProps,
  ScoreShardProps,
  ScoreProps,
  NoteLine,
  ScoreData,
  NoteData,
  ScoreMeasureProps,
  MeasureData,
  ScoreMeasureAttributesProps,
  ScoreMeasureContentProps,
  BoundingBox,
} from '@/components/score/types';
import {
  ACCIDENTAL_WIDTH,
  NOTE_TRANSLATE_X,
  NOTEHEAD_HEIGHT,
  NOTEHEAD_LINE_MARGIN,
  NOTEHEAD_WIDTH,
  STAFF_LINE_HEIGHT,
} from '@/components/score/consts';
import { Pitch } from '@/lib/piano/pitch';
import React from 'react';
import { GClef, StaffLines } from './icons';

export function getScoreProps({
  data,
  fontSize,
}: {
  data: ScoreData;
  fontSize: number;
}): ScoreProps {
  let width = 0;
  let height = 0;
  const margin = 40;

  const shardPropsList: ScoreShardProps[] = [];

  data.shards.forEach((shard, i) => {
    const props = getShardProps(shard, fontSize);
    width = Math.max(width, props.boundingBox.width + props.boundingBox.left);

    let translateY = props.boundingBox.top;
    if (i > 0) {
      const prevShard = shardPropsList[i - 1];
      translateY +=
        prevShard.translateY + prevShard.boundingBox.height + margin;
    }

    shardPropsList.push({ ...props, translateY });
    height = translateY + props.boundingBox.height;
  });

  return {
    width,
    height,
    shardPropsList,
  };
}

function getShardProps(
  { measures }: ScoreData['shards'][number],
  fontSize: number,
): Omit<ScoreShardProps, 'translateY'> {
  const boundingBox: BoundingBox = {
    top: 0,
    left: 0,
    width: 0,
    height: StaffLines.height,
  };

  const measurePropsList: ScoreMeasureProps[] = [];

  measures.forEach((measure) => {
    const props = getMeasureProps(measure, boundingBox.width, fontSize);
    measurePropsList.push(props);
    boundingBox.top = Math.max(boundingBox.top, props.boundingBox.top);
    boundingBox.left = Math.max(boundingBox.left, props.boundingBox.left);
    boundingBox.width += props.boundingBox.width;
    boundingBox.height = Math.max(boundingBox.height, props.boundingBox.height);
  });

  return {
    boundingBox,
    measurePropsList,
  };
}

function getMeasureProps(
  { attributes, content }: MeasureData,
  translateX: number,
  fontSize: number,
): ScoreMeasureProps {
  const boundingBox: BoundingBox = {
    top: 0,
    left: 0,
    width: 0,
    height: StaffLines.height,
  };
  const attributesProps = getMeasureAttributesProps(attributes);

  boundingBox.top = Math.max(boundingBox.top, attributesProps.boundingBox.top);
  boundingBox.left = Math.max(
    boundingBox.left,
    attributesProps.boundingBox.left,
  );
  boundingBox.width += attributesProps.boundingBox.width;
  boundingBox.height = Math.max(
    boundingBox.height,
    attributesProps.boundingBox.height,
  );

  const contentProps = getMeasureContentProps(
    content,
    attributesProps.boundingBox.width,
    fontSize,
  );

  boundingBox.top = Math.max(boundingBox.top, contentProps.boundingBox.top);
  boundingBox.left = Math.max(boundingBox.left, contentProps.boundingBox.left);
  boundingBox.width += contentProps.boundingBox.width;
  boundingBox.height = Math.max(
    boundingBox.height,
    contentProps.boundingBox.height,
  );

  return {
    boundingBox,
    translateX,
    attributesProps,
    contentProps,
  };
}

function getMeasureAttributesProps({
  keySignature,
  showClef,
}: MeasureData['attributes']): ScoreMeasureAttributesProps {
  const boundingBox: BoundingBox = {
    top: 0,
    left: 0,
    width: 0,
    height: StaffLines.height,
  };
  let clefTranslateX = 0;
  let clefTranslateY = 0;
  let keySignatureTranslateX = 0;
  let clef: React.ReactNode;

  if (showClef) {
    clef = <GClef.icon />;
    clefTranslateX = 20;
    clefTranslateY = -30;
    boundingBox.width += GClef.width + clefTranslateX * 2;
    boundingBox.top -= clefTranslateY;
    boundingBox.height += GClef.height - StaffLines.height + clefTranslateY;
  }

  if (keySignature) {
    keySignatureTranslateX += boundingBox.width;
    boundingBox.width += Math.abs(keySignature.fifths) * 13;
    boundingBox.width += 20;
  }

  return {
    boundingBox,
    keySignature: {
      fifths: keySignature.fifths,
      translateX: keySignatureTranslateX,
    },
    clef,
    clefTranslateX,
    clefTranslateY,
  };
}

function getMeasureContentProps(
  { notes }: MeasureData['content'],
  translateX: number,
  fontSize: number,
): ScoreMeasureContentProps {
  const boundingBox: BoundingBox = {
    top: 0,
    left: 0,
    width: 0,
    height: StaffLines.height,
  };
  let textTranslateY = 0;
  const textMargin = fontSize * 2;

  const notePropsList = notes.map((note) => {
    const noteProps = getNoteProps({ note, fontSize, x: boundingBox.width });
    boundingBox.top = Math.max(boundingBox.top, noteProps.boundingBox.top);
    boundingBox.height = Math.max(
      boundingBox.height,
      noteProps.boundingBox.height,
    );
    boundingBox.width +=
      noteProps.boundingBox.width + noteProps.boundingBox.left;
    if (note.name) {
      textTranslateY = Math.max(
        textTranslateY,
        boundingBox.height + textMargin,
      );
    }
    return noteProps;
  });

  if (textTranslateY) {
    boundingBox.height += textMargin + fontSize;
  }

  return {
    boundingBox,
    translateX,
    notePropsList: notePropsList.map((noteProps) => ({
      ...noteProps,
      textTranslateY,
    })),
  };
}

function getNoteProps({
  note,
  fontSize,
  x,
}: {
  note: NoteData;
  fontSize: number;
  x: number;
}): Omit<ScoreNoteProps, 'textTranslateY'> {
  let boundingBox: BoundingBox = {
    top: 0,
    left: 0,
    width: NOTEHEAD_WIDTH + NOTEHEAD_LINE_MARGIN * 2,
    height: StaffLines.height,
  };
  let acciMap = new Map<string, boolean>();
  let noteMap = new Map<string, boolean>();
  let maxPosition = 0;
  const noteLineRecords: Record<number, NoteLine> = {};
  const pitches = note.pitches.sort(compareNoteByPosition);

  const noteheadPropsList = pitches.map((pitch) => {
    const position = pitch.position;
    maxPosition = Math.max(maxPosition, position);

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
    boundingBox.left = Math.max(boundingBox.left, -accidentalTranslateX);

    // たま
    const translateY = STAFF_LINE_HEIGHT * 4.5 - position * STAFF_LINE_HEIGHT;
    boundingBox.top = Math.max(boundingBox.top, -translateY);
    if (translateY > 0) {
      boundingBox.height = Math.max(
        boundingBox.height,
        translateY + NOTEHEAD_HEIGHT,
      );
    }
    let noteheadNumber = 0;
    if (noteMap.get(`0,${position - 0.5}`)) {
      noteheadNumber++;
    }
    noteMap.set(`${noteheadNumber},${position}`, true);
    const noteheadTranslateX =
      noteheadNumber * NOTE_TRANSLATE_X + NOTEHEAD_LINE_MARGIN;
    if (noteheadNumber > 0) {
      boundingBox.width = Math.max(
        boundingBox.width,
        noteheadTranslateX + NOTEHEAD_WIDTH + NOTEHEAD_LINE_MARGIN,
      );
    }

    // ライン
    generateLinePositions(position).forEach((position) => {
      if (noteLineRecords[position]) {
        noteLineRecords[position].width = Math.max(
          noteLineRecords[position].width,
          NOTE_TRANSLATE_X * noteheadNumber +
            NOTEHEAD_WIDTH +
            NOTEHEAD_LINE_MARGIN * 2,
        );
      } else {
        noteLineRecords[position] = {
          translateY: STAFF_LINE_HEIGHT * 5 - position * STAFF_LINE_HEIGHT,
          width:
            NOTE_TRANSLATE_X * noteheadNumber +
            NOTEHEAD_WIDTH +
            NOTEHEAD_LINE_MARGIN * 2,
        };
      }
    });

    return {
      pitch,
      noteheadTranslateX,
      translateY,
      accidentalTranslateX,
      accidentalTranslateY,
      position,
    };
  });

  // テキスト
  let gap = 20;
  if (note.name) {
    const width = boundingBox.width + boundingBox.left;
    const textWidth = (note.name.length * fontSize) / 1.5;
    gap = Math.max(gap, (textWidth - width) / 2);
  }
  boundingBox.left += gap;
  boundingBox.width += gap;

  return {
    boundingBox,
    note,
    fontSize,
    translateX: x + boundingBox.left,
    noteheadPropsList,
    maxPosition,
    noteLines: Object.values(noteLineRecords),
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
