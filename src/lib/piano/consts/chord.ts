import { ChordType } from '../types';

export const chordTypes: Record<string, ChordType> = {
  majorTriad: {
    symbol: '',
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
    symbol: 'mMaj7',
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
  sus4: {
    symbol: 'sus4',
    name: 'サスフォー',
    nameEn: 'Suspended 4th',
    intervals: [
      {
        number: 3,
        integer: 5,
      },
      {
        number: 5,
        integer: 7,
      },
    ],
  },
  add9: {
    symbol: 'add9',
    name: 'アッドナイン',
    nameEn: 'Add 9th',
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
        number: 9,
        integer: 14,
      },
    ],
  },
};
