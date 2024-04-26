import { chordTypes } from './consts';
import { Pitch } from './pitch';

/**
 * 音の名前
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/step/}
 */
export type StepValue = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

/**
 * オクターブ
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/octave/}
 */
export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Step = {
  value: StepValue;
  number: number;
  integer: number;
  position: number;
  name: {
    ja: string;
    iroha: string;
    en: string;
    de: string;
  };
};

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
  notes: Pitch[];
  fifths: number;
};

export type ChordTypeId = keyof typeof chordTypes;

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
  inversion?: number;
  accidental?: Accidental;
  suffix?: string;
  type?: ChordType;
  pitches: Pitch[];
};

export type Accidental =
  | 'sharp'
  | 'dsharp'
  | 'flat'
  | 'dflat'
  | 'neutral'
  | undefined;
