import { chord } from './chord';
import { Note } from './note';

describe('piano.chord', () => {
  test('chord', () => {
    let note = new Note({
      baseNoteId: 'd',
      octave: 4,
    });
    let result = chord(note, 'dominantSeventh');

    expect(result.name).toBe('D7');
    expect(result.notes).toStrictEqual([
      new Note({
        baseNoteId: 'd',
        octave: 4,
      }),
      new Note({
        baseNoteId: 'f',
        octave: 4,
        accidental: 'sharp',
      }),
      new Note({
        baseNoteId: 'a',
        octave: 4,
      }),
      new Note({
        baseNoteId: 'c',
        octave: 5,
      }),
    ]);

    note = new Note({
      baseNoteId: 'd',
      octave: 4,
    });
    result = chord(note, 'majorTriad');

    expect(result.name).toBe('D');
  });
});
