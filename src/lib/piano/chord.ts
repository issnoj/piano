import { chordTypes } from './consts';
import { Note, getAllNoteByKey, getBaseNoteByNumber, note } from './note';
import { Chord, ChordTypeId } from './types';

export function chord(
  pianoNote: Note,
  type: ChordTypeId,
  inversion: number = 0,
): Chord {
  const pianoNotes: Note[] = [];
  const chordType = chordTypes[type];
  const intervals = [
    {
      number: 1,
      integer: 0,
    },
    ...chordType.intervals,
  ];

  intervals.forEach((interval, i) => {
    const _nextNumber = pianoNote.number + interval.number - 1;
    const nextNumber = _nextNumber % 7;
    const nextBaseNote = getBaseNoteByNumber(nextNumber);
    let nextOctave = pianoNote.octave + Math.floor(_nextNumber / 7);
    let nextInteger = pianoNote.integer + interval.integer;
    if (inversion && i < inversion) {
      nextOctave += 1;
      nextInteger += 12;
    }

    const nextNote = note({
      stepValue: nextBaseNote.value,
      octave: nextOctave,
      integer: nextInteger,
    });

    pianoNotes.push(nextNote);
  });

  let name = `${pianoNote.getName('en')}${chordType.symbol || ''}`;

  let suffix = '';
  if (inversion) {
    const note = pianoNotes[inversion];
    if (note) {
      suffix = `/${note.step.name.en}`;
      name += suffix;
    }
  }

  return {
    name,
    inversion,
    accidental: pianoNote.accidental,
    suffix,
    type: chordType,
    notes: pianoNotes,
  };
}

export function cleanChordText(input: string): string {
  return input
    .replace(/[\s-_　]+/, ' ')
    .replaceAll('♭', 'b')
    .replaceAll('♯', '#')
    .replaceAll('＃', '#')
    .replaceAll('／', '/')
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (v) => {
      return String.fromCharCode(v.charCodeAt(0) - 0xfee0);
    })
    .toLocaleLowerCase()
    .replace(/[^a-gijmsu♭♯#ø\d\s/]/g, '');
}

export function getAllChordByKey(): Record<string, Chord> {
  const notes = getAllNoteByKey();
  const chords: Record<string, Chord> = {};
  Object.keys(notes).forEach((noteKey) => {
    const note = notes[noteKey];
    Object.keys(chordTypes).forEach((chordTypeId) => {
      const chordType = chordTypes[chordTypeId];
      const inversionCount = chordType.intervals.length;
      for (let i = 0; i <= inversionCount; i++) {
        const pianoChord = chord(note, chordTypeId, i);
        const key = `${noteKey}${chordType.symbol?.toLowerCase()}${pianoChord.suffix?.toLowerCase()}`;
        chords[key] = pianoChord;
      }
    });
  });
  return chords;
}

export function text2Chord(string: string): Chord | undefined {
  const chords = getAllChordByKey();
  return chords[string];
}

export function text2Chords(input: string): Chord[] {
  const chords: Chord[] = [];
  for (const chordString of cleanChordText(input).split(' ')) {
    const chord = text2Chord(chordString);
    if (chord) {
      chords.push(chord);
    }
  }
  return chords;
}
