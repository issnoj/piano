import { Step, StepValue } from '../types';

export const steps: Record<StepValue, Step> = {
  C: {
    value: 'C',
    number: 0,
    integer: 0,
    position: 0,
    name: {
      ja: 'ド',
      iroha: 'ハ',
      en: 'C',
      de: 'C',
    },
  },
  D: {
    value: 'D',
    number: 1,
    integer: 2,
    position: 0.5,
    name: {
      ja: 'レ',
      iroha: 'ニ',
      en: 'D',
      de: 'D',
    },
  },
  E: {
    value: 'E',
    number: 2,
    integer: 4,
    position: 1,
    name: {
      ja: 'ミ',
      iroha: 'ホ',
      en: 'E',
      de: 'E',
    },
  },
  F: {
    value: 'F',
    number: 3,
    integer: 5,
    position: 1.5,
    name: {
      ja: 'ファ',
      iroha: 'ヘ',
      en: 'F',
      de: 'F',
    },
  },
  G: {
    value: 'G',
    number: 4,
    integer: 7,
    position: 2,
    name: {
      ja: 'ソ',
      iroha: 'ト',
      en: 'G',
      de: 'G',
    },
  },
  A: {
    value: 'A',
    number: 5,
    integer: 9,
    position: 2.5,
    name: {
      ja: 'ラ',
      iroha: 'イ',
      en: 'A',
      de: 'A',
    },
  },
  B: {
    value: 'B',
    number: 6,
    integer: 11,
    position: 3,
    name: {
      ja: 'シ',
      iroha: 'ロ',
      en: 'B',
      de: 'H',
    },
  },
};
