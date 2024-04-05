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
  id: ScaleTypeId;
  shortName: string;
  name: string;
  nameEn: string;
  nameDe: string;
  intervals: number[];
};

export type Scale = {
  shortName: string;
  name: string;
  nameEn: string;
  nameDe: string;
  type: ScaleType;
  notes: Note[];
};

export type ChordTypeId =
  | 'majorTriad'
  | 'majorSixth'
  | 'dominantSeventh'
  | 'majorSeventh'
  | 'augmentedTriad'
  | 'augmentedSeventh'
  | 'minorTriad'
  | 'minorSixth'
  | 'minorSeventh'
  | 'minorMajorSeventh'
  | 'diminishedTriad'
  | 'diminishedSeventh'
  | 'halfDiminishedSeventh';

export type ChordType = {
  name: string;
  nameEn: string;
  symbol?: string;
  intervals: Array<{
    number: number;
    integer: number;
  }>;
};

export type Chord = {
  name: string;
  type?: ChordType;
  notes: Note[];
};
