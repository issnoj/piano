import { chord } from './chord';
import { Note } from './note';

describe('piano.chord', () => {
  test('chord', () => {
    let note = new Note({
      stepValue: 'D',
      octave: 4,
    });
    let result = chord(note, 'dominantSeventh');

    expect(result.name).toBe('D7');
    expect(result.notes).toStrictEqual([
      new Note({
        stepValue: 'D',
        octave: 4,
      }),
      new Note({
        stepValue: 'F',
        octave: 4,
        accidental: 'sharp',
      }),
      new Note({
        stepValue: 'A',
        octave: 4,
      }),
      new Note({
        stepValue: 'C',
        octave: 5,
      }),
    ]);

    note = new Note({
      stepValue: 'D',
      octave: 4,
    });
    result = chord(note, 'majorTriad');

    expect(result.name).toBe('D');
  });
});
