import { baseNotes } from './const';
import { Accidental, BaseNote, BaseNoteId, NoteName } from './types';

export class Note {
  number: number;
  name: NoteName;
  octave: number;
  integer: number;
  position: number;
  accidental?: Accidental;

  constructor({
    baseNoteId,
    octave,
    accidental,
  }: {
    baseNoteId: BaseNoteId;
    octave: number;
    integer?: number;
    position?: number;
    accidental?: Accidental;
  }) {
    const baseNote = baseNotes[baseNoteId];
    this.number = baseNote.number;
    this.name = baseNote.name;
    this.octave = octave;
    this.integer = baseNote.integer + (octave - 4) * 12;
    this.position = baseNote.position + (octave - 4) * 3.5;
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
    let name = this.name[lang][0];

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

export function getBaseNoteByNumber(number: number): BaseNote {
  return Object.values(baseNotes).find(
    (note) => note.number === number,
  ) as BaseNote;
}

export function note({
  baseNoteId = 'c',
  octave = 4,
  accidental,
  integer,
}: {
  baseNoteId?: BaseNoteId;
  octave?: number;
  accidental?: Accidental;
  integer?: number;
} = {}): Note {
  if (integer !== undefined) {
    accidental = getAccidental(baseNoteId, integer);
  }
  return new Note({ baseNoteId, octave, accidental });
}

export function getAccidental(
  baseNoteId: BaseNoteId,
  integer: number,
): Accidental {
  const mod = integer % 12;

  if (baseNoteId === 'c') {
    if ([-2, 10].includes(mod)) return 'dflat';
    if ([-1, 11].includes(mod)) return 'flat';
    if ([0].includes(mod)) return undefined;
    if ([1, -11].includes(mod)) return 'sharp';
    if ([2, -10].includes(mod)) return 'dsharp';
  }
  if (baseNoteId === 'd') {
    if ([0].includes(mod)) return 'dflat';
    if ([1, -11].includes(mod)) return 'flat';
    if ([2, -10].includes(mod)) return undefined;
    if ([3, -9].includes(mod)) return 'sharp';
    if ([4, -8].includes(mod)) return 'dsharp';
  }
  if (baseNoteId === 'e') {
    if ([2, -10].includes(mod)) return 'dflat';
    if ([3, -9].includes(mod)) return 'flat';
    if ([4, -8].includes(mod)) return undefined;
    if ([5, -7].includes(mod)) return 'sharp';
    if ([6, -6].includes(mod)) return 'dsharp';
  }
  if (baseNoteId === 'f') {
    if ([3, -9].includes(mod)) return 'dflat';
    if ([4, -8].includes(mod)) return 'flat';
    if ([5, -7].includes(mod)) return undefined;
    if ([6, -6].includes(mod)) return 'sharp';
    if ([7, -5].includes(mod)) return 'dsharp';
  }
  if (baseNoteId === 'g') {
    if ([5, -7].includes(mod)) return 'dflat';
    if ([6, -6].includes(mod)) return 'flat';
    if ([7, -5].includes(mod)) return undefined;
    if ([8, -4].includes(mod)) return 'sharp';
    if ([9, -3].includes(mod)) return 'dsharp';
  }
  if (baseNoteId === 'a') {
    if ([7, -5].includes(mod)) return 'dflat';
    if ([8, -4].includes(mod)) return 'flat';
    if ([9, -3].includes(mod)) return undefined;
    if ([10, -2].includes(mod)) return 'sharp';
    if ([11, -1].includes(mod)) return 'dsharp';
  }
  if (baseNoteId === 'b') {
    if ([9, -3].includes(mod)) return 'dflat';
    if ([10, -2].includes(mod)) return 'flat';
    if ([11, -1].includes(mod)) return undefined;
    if ([0].includes(mod)) return 'sharp';
    if ([1, -11].includes(mod)) return 'dsharp';
  }
}
