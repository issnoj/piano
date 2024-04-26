import { Pitch } from '@/lib/piano/pitch';
import { Chord } from '@/lib/piano/types';

export type ScoreType = {
  width: number;
  height: number;
  translateY: number;
  shardPropsList: ScoreShardProps[];
};

export type ScoreShardProps = {
  width: number;
  height: number;
  translateY: number;
  measurePropsList: ScoreMeasureProps[];
};

export type ScoreMeasureProps = {
  width: number;
  height: number;
  attributesProps: ScoreMeasureAttributesProps;
  noteListPropsList: Omit<ScoreNoteListProps, 'height'>[];
};

export type ScoreMeasureAttributesProps = {
  width: number;
  height: number;
  keySignature?: { fifths: number };
  showClef: boolean;
};

export type ScoreNoteListProps = {
  notePropsList: ScoreNoteProps[];
  noteLines: NoteLine[];
  chord: Chord;
  fontSize: number;
  translateX: number;
  width: number;
  height: number;
  minTranslateX: number;
};

export type ScoreNoteProps = {
  pitch: Pitch;
  translateY: number;
  noteTranslateX: number;
  accidentalTranslateX: number;
  accidentalTranslateY: number;
};

export type NoteLine = {
  position: number;
  number: number;
};
