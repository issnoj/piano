import { chordTypes } from './consts';
import { Note, getBaseNoteByNumber, note } from './note';
import { Chord, ChordTypeId } from './types';

export function chord(pianoNote: Note, type: ChordTypeId): Chord {
  const pianoNotes: Note[] = [pianoNote];

  const chordType = chordTypes[type];

  chordType.intervals.forEach((interval) => {
    const _nextNumber = pianoNote.number + interval.number - 1;
    const nextNumber = _nextNumber % 7;
    const nextBaseNote = getBaseNoteByNumber(nextNumber);
    const nextOctave = pianoNote.octave + Math.floor(_nextNumber / 7);

    const nextInteger = pianoNote.integer + interval.integer;

    const nextNote = note({
      stepValue: nextBaseNote.value,
      octave: nextOctave,
      integer: nextInteger,
    });

    pianoNotes.push(nextNote);
  });

  const name = `${pianoNote.getName('en')}${chordType.symbol || ''}`;

  return {
    name,
    type: chordType,
    notes: pianoNotes,
  };
}
