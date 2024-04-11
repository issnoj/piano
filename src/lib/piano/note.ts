import { steps } from './consts';
import { Accidental, Step, StepValue } from './types';

export class Note {
  number: number;
  step: Step;
  octave: number;
  integer: number;
  position: number;
  accidental?: Accidental;

  constructor({
    stepValue,
    octave,
    accidental,
  }: {
    stepValue: StepValue;
    octave: number;
    integer?: number;
    position?: number;
    accidental?: Accidental;
  }) {
    this.step = steps[stepValue];
    this.number = this.step.number;
    this.octave = octave;
    this.integer = this.step.integer + (octave - 4) * 12;
    this.position = this.step.position + (octave - 4) * 3.5;
    this.accidental = accidental;

    if (accidental === 'sharp') {
      this.integer++;
    } else if (accidental === 'dsharp') {
      this.integer += 2;
    } else if (accidental === 'flat') {
      this.integer--;
    } else if (accidental === 'dflat') {
      this.integer -= 2;
    }
  }

  getName(lang: 'ja' | 'en' | 'de'): string {
    let name = this.step.name[lang][0];

    if (lang === 'de') {
      if (this.accidental === 'sharp') {
        name += 'is';
      } else if (this.accidental === 'dsharp') {
        name += 'isis';
      } else if (this.accidental === 'flat') {
        if (name === 'E' || name === 'A') {
          name += 's';
        } else if (name === 'H') {
          name = 'B';
        } else {
          name += 'es';
        }
      } else if (this.accidental === 'dflat') {
        if (name === 'E' || name === 'A') {
          name += 'ses';
        } else {
          name += 'eses';
        }
      }
    } else {
      if (this.accidental === 'sharp') {
        name += '♯';
      } else if (this.accidental === 'dsharp') {
        name += '♯♯';
      } else if (this.accidental === 'flat') {
        name += '♭';
      } else if (this.accidental === 'dflat') {
        name += '♭♭';
      }
    }
    return name;
  }
}

export function getBaseNoteByNumber(number: number): Step {
  return Object.values(steps).find((note) => note.number === number) as Step;
}

export function note({
  stepValue = 'C',
  octave = 4,
  accidental,
  integer,
}: {
  stepValue?: StepValue;
  octave?: number;
  accidental?: Accidental;
  integer?: number;
} = {}): Note {
  if (integer !== undefined) {
    accidental = getAccidental(stepValue, integer);
  }
  return new Note({ stepValue: stepValue, octave, accidental });
}

export function getAccidental(
  stepValue: StepValue,
  integer: number,
): Accidental {
  const mod = integer % 12;

  if (stepValue === 'C') {
    if ([-2, 10].includes(mod)) return 'dflat';
    if ([-1, 11].includes(mod)) return 'flat';
    if ([0].includes(mod)) return undefined;
    if ([1, -11].includes(mod)) return 'sharp';
    if ([2, -10].includes(mod)) return 'dsharp';
  }
  if (stepValue === 'D') {
    if ([0].includes(mod)) return 'dflat';
    if ([1, -11].includes(mod)) return 'flat';
    if ([2, -10].includes(mod)) return undefined;
    if ([3, -9].includes(mod)) return 'sharp';
    if ([4, -8].includes(mod)) return 'dsharp';
  }
  if (stepValue === 'E') {
    if ([2, -10].includes(mod)) return 'dflat';
    if ([3, -9].includes(mod)) return 'flat';
    if ([4, -8].includes(mod)) return undefined;
    if ([5, -7].includes(mod)) return 'sharp';
    if ([6, -6].includes(mod)) return 'dsharp';
  }
  if (stepValue === 'F') {
    if ([3, -9].includes(mod)) return 'dflat';
    if ([4, -8].includes(mod)) return 'flat';
    if ([5, -7].includes(mod)) return undefined;
    if ([6, -6].includes(mod)) return 'sharp';
    if ([7, -5].includes(mod)) return 'dsharp';
  }
  if (stepValue === 'G') {
    if ([5, -7].includes(mod)) return 'dflat';
    if ([6, -6].includes(mod)) return 'flat';
    if ([7, -5].includes(mod)) return undefined;
    if ([8, -4].includes(mod)) return 'sharp';
    if ([9, -3].includes(mod)) return 'dsharp';
  }
  if (stepValue === 'A') {
    if ([7, -5].includes(mod)) return 'dflat';
    if ([8, -4].includes(mod)) return 'flat';
    if ([9, -3].includes(mod)) return undefined;
    if ([10, -2].includes(mod)) return 'sharp';
    if ([11, -1].includes(mod)) return 'dsharp';
  }
  if (stepValue === 'B') {
    if ([9, -3].includes(mod)) return 'dflat';
    if ([10, -2].includes(mod)) return 'flat';
    if ([11, -1].includes(mod)) return undefined;
    if ([0].includes(mod)) return 'sharp';
    if ([1, -11].includes(mod)) return 'dsharp';
  }
}

export function getAllNoteByKey(): Record<string, Note> {
  const notes: Record<string, Note> = {};
  Object.values(steps).forEach((step) => {
    for (const alter of ['', 'b', '♭', 'bb', '♭♭', '#', '♯', '##', '♯♯']) {
      let accidental: Accidental | undefined;
      switch (alter) {
        case 'b':
        case '♭':
          accidental = 'flat';
          break;
        case 'bb':
        case '♭♭':
          accidental = 'dflat';
          break;
        case '#':
        case '♯':
          accidental = 'sharp';
          break;
        case '##':
        case '♯♯':
          accidental = 'dsharp';
          break;
      }
      notes[`${step.value.toLowerCase()}${alter}`] = note({
        stepValue: step.value,
        octave: 4,
        accidental,
      });
    }
  });
  return notes;
}

export function text2Note(text: string): Note | null {
  const stepValueText = text[0].toUpperCase();
  const rest = text.slice(1);
  const m = rest.match(/^(\d*)(.*)/);
  const octave = m && m[1] !== '' ? Number(m[1]) : 4;
  const alter = m && m[2] ? m[2] : '';
  const stepValue = stepValueText as StepValue;

  let accidental: Accidental | undefined;
  switch (alter) {
    case '':
      break;
    case 'b':
    case '♭':
      accidental = 'flat';
      break;
    case 'bb':
    case '♭♭':
      accidental = 'dflat';
      break;
    case '#':
    case '♯':
      accidental = 'sharp';
      break;
    case '##':
    case '♯♯':
      accidental = 'dsharp';
      break;
    default:
      return null;
  }

  return note({ stepValue, octave, accidental });
}
