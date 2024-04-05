import { scaleTypes } from './const';
import { Note, getBaseNoteByNumber, note } from './note';
import { Scale, ScaleTypeId } from './types';

export function scale(pianoNote: Note, type: ScaleTypeId): Scale {
  const pianoNotes: Note[] = [pianoNote];

  let sumInterval = 0;
  const scaleType = scaleTypes[type];

  scaleType.intervals.forEach((interval, index) => {
    const _nextNumber = pianoNote.number + index + 1;
    const nextNumber = _nextNumber % 7;
    const nextBaseNote = getBaseNoteByNumber(nextNumber);
    const nextOctave = pianoNote.octave + Math.floor(_nextNumber / 7);

    sumInterval += interval;
    const nextInteger = pianoNote.integer + sumInterval;

    const nextNote = note({
      baseNoteId: nextBaseNote.id,
      octave: nextOctave,
      integer: nextInteger,
    });

    pianoNotes.push(nextNote);
  });

  let namePrefix = '';
  if (pianoNote.accidental === 'sharp') {
    namePrefix = '嬰';
  } else if (pianoNote.accidental === 'flat') {
    namePrefix = '変';
  }
  const shortName = `${namePrefix}${pianoNote.name.ja[1]}${scaleType.shortName}`;
  const name = `${namePrefix}${pianoNote.name.ja[1]}${scaleType.name}`;
  const nameEn = `${pianoNote.getName('en')} ${scaleType.nameEn}`;
  const nameDe = `${pianoNote.getName('de')} ${scaleType.nameDe}`;

  return {
    shortName,
    name,
    nameEn,
    nameDe,
    type: scaleType,
    notes: pianoNotes,
  };
}
