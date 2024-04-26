import { scaleTypes } from './consts';
import { Pitch } from './pitch';
import { scale } from './scale';

describe('piano.scale', () => {
  test('存在しないスケール', () => {
    const note = new Pitch({
      stepValue: 'B',
      octave: 4,
      accidental: 'sharp',
    });
    const result = scale(note, 'major');

    expect(result).toBeNull();
  });

  test('major', () => {
    const note = new Pitch({
      stepValue: 'E',
      octave: 4,
      accidental: 'flat',
    });
    const result = scale(note, 'harmonicMinor');

    expect(result).not.toBeNull();
    if (!result) return;
    expect(result?.fifths).toBe(-6);
    expect(result.shortName).toBe('変ホ短調');
    expect(result.name).toBe('変ホ和声短音階');
    expect(result.nameEn).toBe('E♭ Harmonic Minor');
    expect(result.nameDe).toBe('Es Harmonic Moll');
    expect(result.type).toBe(scaleTypes.harmonicMinor);
  });

  test('major 2', () => {
    const note = new Pitch({
      stepValue: 'C',
      octave: 4,
    });
    const result = scale(note, 'major');

    expect(result).not.toBeNull();
    if (!result) return;
    expect(result?.fifths).toBe(0);
    expect(result.shortName).toBe('ハ長調');
    expect(result.name).toBe('ハ長音階');
    expect(result.nameEn).toBe('C Major');
    expect(result.nameDe).toBe('C Dur');
    expect(result.type).toBe(scaleTypes.major);
  });

  test('minor', () => {
    const note = new Pitch({
      stepValue: 'G',
      octave: 4,
      accidental: 'sharp',
    });
    const result = scale(note, 'minor');

    expect(result).not.toBeNull();
    if (!result) return;
    expect(result.fifths).toBe(5);
    expect(result.shortName).toBe('嬰ト短調');
    expect(result.name).toBe('嬰ト自然短音階');
    expect(result.nameEn).toBe('G♯ Minor');
    expect(result.nameDe).toBe('Gis Moll');
    expect(result.type).toBe(scaleTypes.minor);
    expect(result.notes).toStrictEqual([
      new Pitch({
        stepValue: 'G',
        octave: 4,
        accidental: 'sharp',
      }),
      new Pitch({
        stepValue: 'A',
        octave: 4,
        accidental: 'sharp',
      }),
      new Pitch({
        stepValue: 'B',
        octave: 4,
      }),
      new Pitch({
        stepValue: 'C',
        octave: 5,
        accidental: 'sharp',
      }),
      new Pitch({
        stepValue: 'D',
        octave: 5,
        accidental: 'sharp',
      }),
      new Pitch({
        stepValue: 'E',
        octave: 5,
      }),
      new Pitch({
        stepValue: 'F',
        octave: 5,
        accidental: 'sharp',
      }),
      new Pitch({
        stepValue: 'G',
        octave: 5,
        accidental: 'sharp',
      }),
    ]);
  });
});
