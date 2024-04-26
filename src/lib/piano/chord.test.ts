import {
  chord,
  text2Chords,
  text2Chord,
  cleanChordText,
  getAllChordByKey,
} from './chord';
import { Pitch, text2pitch } from './pitch';

describe('piano.chord', () => {
  test('chord', () => {
    let note = new Pitch({
      stepValue: 'D',
      octave: 4,
    });
    let result = chord(note, 'dominantSeventh');

    expect(result.name).toBe('D7');
    expect(result.pitches).toStrictEqual([
      new Pitch({
        stepValue: 'D',
        octave: 4,
      }),
      new Pitch({
        stepValue: 'F',
        octave: 4,
        accidental: 'sharp',
      }),
      new Pitch({
        stepValue: 'A',
        octave: 4,
      }),
      new Pitch({
        stepValue: 'C',
        octave: 5,
      }),
    ]);

    note = new Pitch({
      stepValue: 'D',
      octave: 4,
    });
    result = chord(note, 'majorTriad');

    expect(result.name).toBe('D');
  });

  test('chord inversion', () => {
    let note = new Pitch({
      stepValue: 'C',
      octave: 4,
    });
    let result = chord(note, 'majorTriad', 1);

    expect(result.name).toBe('C/E');
    expect(result.pitches).toStrictEqual([
      new Pitch({
        stepValue: 'C',
        octave: 5,
      }),
      new Pitch({
        stepValue: 'E',
        octave: 4,
      }),
      new Pitch({
        stepValue: 'G',
        octave: 4,
      }),
    ]);
  });

  test('cleanChordText', () => {
    expect(cleanChordText('ABC')).toBe('abc');
    expect(cleanChordText('cdefgabijmsu/♭♯')).toBe('cdefgabijmsu/b#');
    expect(cleanChordText('--__　　  ')).toBe(' ');
    expect(cleanChordText('♭♭')).toBe('bb');
    expect(cleanChordText('♯♯')).toBe('##');
    expect(cleanChordText('＃＃')).toBe('##');
    expect(cleanChordText('／')).toBe('/');
    expect(cleanChordText('０１２３４５６７８９')).toBe('0123456789');
    expect(cleanChordText('ｃｄｅｆｇａｂｉｊｍｓｕ')).toBe('cdefgabijmsu');
    expect(cleanChordText('ＣＤＥＦＧＡＢＩＪＭＳＵ')).toBe('cdefgabijmsu');
    expect(cleanChordText('HKLNOPQRTVWXYZ')).toBe('');
    expect(cleanChordText('hklnopqrtvwxyz')).toBe('');
    expect(cleanChordText('あいうえお')).toBe('');
    expect(cleanChordText('!"$%&\'()=~^|`@{[]};+:*,<.>?\\')).toBe('');
  });

  test('getAllChordByKey', () => {
    const c = chord(text2pitch('c') as Pitch, 'majorTriad');
    const c6 = chord(text2pitch('c') as Pitch, 'majorSixth');
    const c7 = chord(text2pitch('c') as Pitch, 'dominantSeventh');
    const cmaj7 = chord(text2pitch('c') as Pitch, 'majorSeventh');
    const caug = chord(text2pitch('c') as Pitch, 'augmentedTriad');
    const caug7 = chord(text2pitch('c') as Pitch, 'augmentedSeventh');
    const cm = chord(text2pitch('c') as Pitch, 'minorTriad');
    const cm6 = chord(text2pitch('c') as Pitch, 'minorSixth');
    const cm7 = chord(text2pitch('c') as Pitch, 'minorSeventh');
    const cmmaj7 = chord(text2pitch('c') as Pitch, 'minorMajorSeventh');
    const cdim = chord(text2pitch('c') as Pitch, 'diminishedTriad');
    const cdim7 = chord(text2pitch('c') as Pitch, 'diminishedSeventh');
    const cø = chord(text2pitch('c') as Pitch, 'halfDiminishedSeventh');
    const csus4 = chord(text2pitch('c') as Pitch, 'sus4');
    const cadd9 = chord(text2pitch('c') as Pitch, 'add9');

    const result = getAllChordByKey();

    expect(result['c']).toStrictEqual(c);
    expect(result['c6']).toStrictEqual(c6);
    expect(result['c7']).toStrictEqual(c7);
    expect(result['cmaj7']).toStrictEqual(cmaj7);
    expect(result['caug']).toStrictEqual(caug);
    expect(result['caug7']).toStrictEqual(caug7);
    expect(result['cm']).toStrictEqual(cm);
    expect(result['cm6']).toStrictEqual(cm6);
    expect(result['cm7']).toStrictEqual(cm7);
    expect(result['cmmaj7']).toStrictEqual(cmmaj7);
    expect(result['cdim']).toStrictEqual(cdim);
    expect(result['cdim7']).toStrictEqual(cdim7);
    expect(result['cø']).toStrictEqual(cø);
    expect(result['csus4']).toStrictEqual(csus4);
    expect(result['cadd9']).toStrictEqual(cadd9);

    // フラット・シャープ
    expect(result['cb']).toStrictEqual(
      chord(text2pitch('cb') as Pitch, 'majorTriad'),
    );
    expect(result['c#']).toStrictEqual(
      chord(text2pitch('c#') as Pitch, 'majorTriad'),
    );

    // 転回形
    expect(result['c/e']).toStrictEqual(
      chord(text2pitch('c') as Pitch, 'majorTriad', 1),
    );
    expect(result['c/g']).toStrictEqual(
      chord(text2pitch('c') as Pitch, 'majorTriad', 2),
    );
    expect(result['cb/e']).toStrictEqual(
      chord(text2pitch('cb') as Pitch, 'majorTriad', 1),
    );
    expect(result['cb/g']).toStrictEqual(
      chord(text2pitch('cb') as Pitch, 'majorTriad', 2),
    );
  });

  test('text2Chord', () => {
    expect(text2Chord('c')).toStrictEqual(
      chord(text2pitch('c') as Pitch, 'majorTriad'),
    );
    expect(text2Chord('cb7')).toStrictEqual(
      chord(text2pitch('cb') as Pitch, 'dominantSeventh'),
    );
    expect(text2Chord('c##mmaj7')).toStrictEqual(
      chord(text2pitch('c##') as Pitch, 'minorMajorSeventh'),
    );
    expect(text2Chord('c/e')).toStrictEqual(
      chord(text2pitch('c') as Pitch, 'majorTriad', 1),
    );
    expect(text2Chord('c/g')).toStrictEqual(
      chord(text2pitch('c') as Pitch, 'majorTriad', 2),
    );
  });

  test('text2Chords', () => {
    expect(text2Chords('c')).toStrictEqual([text2Chord('c')]);
    expect(text2Chords('c d e f g a b')).toStrictEqual([
      text2Chord('c'),
      text2Chord('d'),
      text2Chord('e'),
      text2Chord('f'),
      text2Chord('g'),
      text2Chord('a'),
      text2Chord('b'),
    ]);
    expect(text2Chords('f fsus4 fadd9 f/c')).toStrictEqual([
      text2Chord('f'),
      text2Chord('fsus4'),
      text2Chord('fadd9'),
      text2Chord('f/c'),
    ]);
    expect(
      text2Chords(
        'c c6 c7 cmaj7 caug caug7 cm cm6 cm7 cmmaj7 cdim cdim7 cø csus4 cadd9',
      ),
    ).toStrictEqual([
      text2Chord('c'),
      text2Chord('c6'),
      text2Chord('c7'),
      text2Chord('cmaj7'),
      text2Chord('caug'),
      text2Chord('caug7'),
      text2Chord('cm'),
      text2Chord('cm6'),
      text2Chord('cm7'),
      text2Chord('cmmaj7'),
      text2Chord('cdim'),
      text2Chord('cdim7'),
      text2Chord('cø'),
      text2Chord('csus4'),
      text2Chord('cadd9'),
    ]);
  });
});
