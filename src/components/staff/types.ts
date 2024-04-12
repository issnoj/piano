import { Note } from '@/lib/piano/note';
import { Chord } from '@/lib/piano/types';

export type StaffType = {
  width: number;
  height: number;
  translateY: number;
  shardPropsList: StaffShardProps[];
};

export type StaffAttributesProps = {
  keySignature?: { fifths: number };
  showClef: boolean;
  width: number;
  height: number;
};

export type StaffShardProps = {
  attributesProps: StaffAttributesProps;
  chordPropsList: Omit<StaffChordProps, 'height'>[];
  width: number;
  height: number;
  translateY: number;
};

export type StaffChordProps = {
  notePropsList: StaffNoteProps[];
  chord: Chord;
  fontSize: number;
  x: number;
  width: number;
  height: number;
};

export type StaffNoteProps = {
  note: Note;
  translateY: number;
  noteTranslateX: number;
  acciTranslateX: number;
};
