import { Note } from './note';

export type NoteName = {
  ja: string[];
  en: string[];
  de: string[];
};

export type Accidental =
  | 'sharp'
  | 'dsharp'
  | 'flat'
  | 'dflat'
  | 'neutral'
  | undefined;

export type PianoChordName = '7';

export type BaseNote = {
  id: BaseNoteId;
  number: number;
  integer: number;
  position: number;
  name: NoteName;
};

export type BaseNoteId = 'c' | 'd' | 'e' | 'f' | 'g' | 'a' | 'b';

export type ScaleTypeId = 'major' | 'minor' | 'harmonicMinor' | 'melodicMinor';

export type ScaleType = {
  shortName: string;
  name: string;
  nameEn: string;
  nameDe: string;
  intervals: number[];
};

export type Scale = {
  name: string;
  nameEn: string;
  nameDe: string;
  type: ScaleType;
  notes: Note[];
};

export type Chord = {
  notes: Note[];
  name: string;
};
