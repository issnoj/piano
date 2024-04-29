import { Pitch } from '@/lib/piano/pitch';
import React from 'react';

export type ScoreData = {
  shards: ShardData[];
};

export type ShardData = {
  measures: MeasureData[];
};

export type MeasureData = {
  attributes: {
    keySignature: { fifths: number };
    showClef: boolean;
  };
  content: {
    notes: NoteData[];
  };
};

export type NoteData = {
  name: string;
  pitches: Pitch[];
};

export type BoundingBox = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type ScoreProps = {
  width: number;
  height: number;
  shardPropsList: ScoreShardProps[];
};

export type ScoreShardProps = {
  boundingBox: BoundingBox;
  translateY: number;
  measurePropsList: ScoreMeasureProps[];
};

export type ScoreMeasureProps = {
  boundingBox: BoundingBox;
  translateX: number;
  attributesProps: ScoreMeasureAttributesProps;
  contentProps: ScoreMeasureContentProps;
};

export type ScoreMeasureAttributesProps = {
  boundingBox: BoundingBox;
  keySignature?: { fifths: number; translateX: number };
  clef: React.ReactNode;
  clefTranslateX: number;
  clefTranslateY: number;
};

export type ScoreMeasureContentProps = {
  boundingBox: BoundingBox;
  translateX: number;
  notePropsList: ScoreNoteProps[];
};

export type ScoreNoteProps = {
  boundingBox: BoundingBox;
  note: NoteData;
  translateX: number;
  maxPosition: number;
  fontSize: number;
  noteLines: NoteLine[];
  noteheadPropsList: ScoreNoteheadProps[];
  textTranslateY: number;
};

export type ScoreNoteheadProps = {
  pitch: Pitch;
  translateY: number;
  noteheadTranslateX: number;
  accidentalTranslateX: number;
  accidentalTranslateY: number;
};

export type NoteLine = {
  width: number;
  translateY: number;
};
