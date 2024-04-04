import { scaleTypes } from './const';
import { Note } from './note';
import { scale } from './scale';

describe('piano.scale', () => {
  test('major', () => {
    const note = new Note({
      baseNoteId: 'g',
      octave: 4,
      accidental: 'flat',
    });
    const result = scale(note, 'minor');

    expect(result.name).toBe('変ト短調');
  });

  test('minor', () => {
    const note = new Note({
      baseNoteId: 'g',
      octave: 4,
      accidental: 'sharp',
    });
    const result = scale(note, 'minor');

    expect(result.name).toBe('嬰ト短調');
    expect(result.nameEn).toBe('G♯ Minor');
    expect(result.nameDe).toBe('Gis Moll');
    expect(result.type).toBe(scaleTypes.minor);
    expect(result.notes).toStrictEqual([
      new Note({
        baseNoteId: 'g',
        octave: 4,
        accidental: 'sharp',
      }),
      new Note({
        baseNoteId: 'a',
        octave: 4,
        accidental: 'sharp',
      }),
      new Note({
        baseNoteId: 'b',
        octave: 4,
      }),
      new Note({
        baseNoteId: 'c',
        octave: 5,
        accidental: 'sharp',
      }),
      new Note({
        baseNoteId: 'd',
        octave: 5,
        accidental: 'sharp',
      }),
      new Note({
        baseNoteId: 'e',
        octave: 5,
      }),
      new Note({
        baseNoteId: 'f',
        octave: 5,
        accidental: 'sharp',
      }),
      new Note({
        baseNoteId: 'g',
        octave: 5,
        accidental: 'sharp',
      }),
    ]);
  });
});
