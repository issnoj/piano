import {
  BaseNote,
  BaseNoteId,
  ChordType,
  ChordTypeId,
  NoteName,
  ScaleType,
  ScaleTypeId,
} from './types';

export const noteNames: Record<string, NoteName> = {
  c: {
    ja: ['ド', 'ハ'],
    en: ['C'],
    de: ['C'],
  },
  d: {
    ja: ['レ', 'ニ'],
    en: ['D'],
    de: ['D'],
  },
  e: {
    ja: ['ミ', 'ホ'],
    en: ['E'],
    de: ['E'],
  },
  f: {
    ja: ['ファ', 'ヘ'],
    en: ['F'],
    de: ['F'],
  },
  g: {
    ja: ['ソ', 'ト'],
    en: ['G'],
    de: ['G'],
  },
  a: {
    ja: ['ラ', 'イ'],
    en: ['A'],
    de: ['A'],
  },
  b: {
    ja: ['シ', 'ロ'],
    en: ['B'],
    de: ['H'],
  },
};

export const baseNotes: Record<BaseNoteId, BaseNote> = {
  c: { id: 'c', number: 0, integer: 0, position: 0, name: noteNames.c },
  d: { id: 'd', number: 1, integer: 2, position: 0.5, name: noteNames.d },
  e: { id: 'e', number: 2, integer: 4, position: 1, name: noteNames.e },
  f: { id: 'f', number: 3, integer: 5, position: 1.5, name: noteNames.f },
  g: { id: 'g', number: 4, integer: 7, position: 2, name: noteNames.g },
  a: { id: 'a', number: 5, integer: 9, position: 2.5, name: noteNames.a },
  b: { id: 'b', number: 6, integer: 11, position: 3, name: noteNames.b },
};

export const scaleTypes: Record<ScaleTypeId, ScaleType> = {
  // 長音階
  major: {
    id: 'major',
    shortName: '長調',
    name: '長音階',
    nameEn: 'Major',
    nameDe: 'Dur',
    intervals: [2, 2, 1, 2, 2, 2, 1],
  },
  // 自然短音階
  minor: {
    id: 'minor',
    shortName: '短調',
    name: '自然短音階',
    nameEn: 'Minor',
    nameDe: 'Moll',
    intervals: [2, 1, 2, 2, 1, 2, 2],
  },
  // 和声短音階
  harmonicMinor: {
    id: 'harmonicMinor',
    shortName: '短調',
    name: '和声短音階',
    nameEn: 'Harmonic Minor',
    nameDe: 'Harmonic Moll',
    intervals: [2, 1, 2, 2, 1, 3, 1],
  },
  // 旋律短音階
  melodicMinor: {
    id: 'melodicMinor',
    shortName: '短調',
    name: '旋律短音階',
    nameEn: 'Melodic Minor',
    nameDe: 'Melodic Moll',
    intervals: [2, 1, 2, 2, 2, 2, 1],
  },
};

export const chordTypes: Record<ChordTypeId, ChordType> = {
  majorTriad: {
    name: 'メジャー・トライアド',
    nameEn: 'Major Triad',
    intervals: [
      {
        number: 3,
        integer: 4,
      },
      {
        number: 5,
        integer: 7,
      },
    ],
  },
  majorSixth: {
    symbol: '6',
    name: 'メジャー・シックスス',
    nameEn: 'Major Sixth',
    intervals: [
      {
        number: 3,
        integer: 4,
      },
      {
        number: 5,
        integer: 7,
      },
      {
        number: 6,
        integer: 9,
      },
    ],
  },
  dominantSeventh: {
    symbol: '7',
    name: 'セブンス',
    nameEn: 'Dominant Seventh',
    intervals: [
      {
        number: 3,
        integer: 4,
      },
      {
        number: 5,
        integer: 7,
      },
      {
        number: 7,
        integer: 10,
      },
    ],
  },
  majorSeventh: {
    symbol: 'maj7',
    name: 'メジャー・セブンス',
    nameEn: 'Major Seventh',
    intervals: [
      {
        number: 3,
        integer: 4,
      },
      {
        number: 5,
        integer: 7,
      },
      {
        number: 7,
        integer: 11,
      },
    ],
  },
  augmentedTriad: {
    symbol: 'aug',
    name: 'オーグメンテッド・トライアド',
    nameEn: 'Augumented Triad',
    intervals: [
      {
        number: 3,
        integer: 4,
      },
      {
        number: 5,
        integer: 8,
      },
    ],
  },
  augmentedSeventh: {
    symbol: 'aug7',
    name: 'オーグメンテッド・セブンス',
    nameEn: 'Augumented Seventh',
    intervals: [
      {
        number: 3,
        integer: 4,
      },
      {
        number: 5,
        integer: 8,
      },
      {
        number: 7,
        integer: 10,
      },
    ],
  },
  minorTriad: {
    symbol: 'm',
    name: 'マイナー・トライアド',
    nameEn: 'Minor Triad',
    intervals: [
      {
        number: 3,
        integer: 3,
      },
      {
        number: 5,
        integer: 7,
      },
    ],
  },
  minorSixth: {
    symbol: 'm6',
    name: 'マイナー・シックスス',
    nameEn: 'Minor Sixth',
    intervals: [
      {
        number: 3,
        integer: 3,
      },
      {
        number: 5,
        integer: 7,
      },
      {
        number: 6,
        integer: 9,
      },
    ],
  },
  minorSeventh: {
    symbol: 'm7',
    name: 'マイナー・セブンス',
    nameEn: 'Minor Seventh',
    intervals: [
      {
        number: 3,
        integer: 3,
      },
      {
        number: 5,
        integer: 7,
      },
      {
        number: 7,
        integer: 10,
      },
    ],
  },
  minorMajorSeventh: {
    symbol: 'm/maj7',
    name: 'マイナー・メージャー・セブンス',
    nameEn: 'Minor Major Seventh',
    intervals: [
      {
        number: 3,
        integer: 3,
      },
      {
        number: 5,
        integer: 7,
      },
      {
        number: 7,
        integer: 11,
      },
    ],
  },
  diminishedTriad: {
    symbol: 'dim',
    name: 'ディミニッシュト・トライアド',
    nameEn: 'Diminished Triad',
    intervals: [
      {
        number: 3,
        integer: 3,
      },
      {
        number: 5,
        integer: 6,
      },
    ],
  },
  diminishedSeventh: {
    symbol: 'dim7',
    name: 'ディミニッシュト・セブンス',
    nameEn: 'Diminished Seventh',
    intervals: [
      {
        number: 3,
        integer: 3,
      },
      {
        number: 5,
        integer: 6,
      },
      {
        number: 7,
        integer: 9,
      },
    ],
  },
  halfDiminishedSeventh: {
    symbol: 'ø',
    name: 'ハーフ・ディミニッシュト・セブンス',
    nameEn: 'Half Diminished Seventh',
    intervals: [
      {
        number: 3,
        integer: 3,
      },
      {
        number: 5,
        integer: 6,
      },
      {
        number: 7,
        integer: 10,
      },
    ],
  },
};
