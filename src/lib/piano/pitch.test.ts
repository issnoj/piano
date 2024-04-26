import {
  pitch,
  getBasePitchByNumber,
  Pitch,
  getAccidental,
  text2pitch,
  getAllPitchByKey,
} from './pitch';

describe('piano.pitch', () => {
  test('getBasePitchByNumber', () => {
    const basePitch = getBasePitchByNumber(0);
    expect(basePitch?.value === 'C').toBe(true);
  });

  test('getAccidental', () => {
    for (let i = -10; i < 11; i++) {
      expect(getAccidental('C', -2 + i * 12)).toBe('dflat');
      expect(getAccidental('C', -1 + i * 12)).toBe('flat');
      expect(getAccidental('C', i * 12)).toBe(undefined);
      expect(getAccidental('C', 1 + i * 12)).toBe('sharp');
      expect(getAccidental('C', 2 + i * 12)).toBe('dsharp');

      expect(getAccidental('D', i * 12)).toBe('dflat');
      expect(getAccidental('D', 1 + i * 12)).toBe('flat');
      expect(getAccidental('D', 2 + i * 12)).toBe(undefined);
      expect(getAccidental('D', 3 + i * 12)).toBe('sharp');
      expect(getAccidental('D', 4 + i * 12)).toBe('dsharp');

      expect(getAccidental('E', 2 + i * 12)).toBe('dflat');
      expect(getAccidental('E', 3 + i * 12)).toBe('flat');
      expect(getAccidental('E', 4 + i * 12)).toBe(undefined);
      expect(getAccidental('E', 5 + i * 12)).toBe('sharp');
      expect(getAccidental('E', 6 + i * 12)).toBe('dsharp');

      expect(getAccidental('F', 3 + i * 12)).toBe('dflat');
      expect(getAccidental('F', 4 + i * 12)).toBe('flat');
      expect(getAccidental('F', 5 + i * 12)).toBe(undefined);
      expect(getAccidental('F', 6 + i * 12)).toBe('sharp');
      expect(getAccidental('F', 7 + i * 12)).toBe('dsharp');

      expect(getAccidental('G', 5 + i * 12)).toBe('dflat');
      expect(getAccidental('G', 6 + i * 12)).toBe('flat');
      expect(getAccidental('G', 7 + i * 12)).toBe(undefined);
      expect(getAccidental('G', 8 + i * 12)).toBe('sharp');
      expect(getAccidental('G', 9 + i * 12)).toBe('dsharp');

      expect(getAccidental('A', 7 + i * 12)).toBe('dflat');
      expect(getAccidental('A', 8 + i * 12)).toBe('flat');
      expect(getAccidental('A', 9 + i * 12)).toBe(undefined);
      expect(getAccidental('A', 10 + i * 12)).toBe('sharp');
      expect(getAccidental('A', 11 + i * 12)).toBe('dsharp');

      expect(getAccidental('B', 9 + i * 12)).toBe('dflat');
      expect(getAccidental('B', 10 + i * 12)).toBe('flat');
      expect(getAccidental('B', 11 + i * 12)).toBe(undefined);
      expect(getAccidental('B', 12 + i * 12)).toBe('sharp');
      expect(getAccidental('B', 13 + i * 12)).toBe('dsharp');
    }
  });

  test.each<[Parameters<typeof pitch>[number] | {}, Pitch]>([
    [
      undefined,
      new Pitch({ stepValue: 'C', octave: 4, accidental: undefined }),
    ],
    [
      { stepValue: 'D' },
      new Pitch({ stepValue: 'D', octave: 4, accidental: undefined }),
    ],
    [
      { stepValue: 'D', octave: 5 },
      new Pitch({ stepValue: 'D', octave: 5, accidental: undefined }),
    ],
    [
      { stepValue: 'D', octave: 6, accidental: 'sharp' },
      new Pitch({ stepValue: 'D', octave: 6, accidental: 'sharp' }),
    ],
    // ピッチクラスを指定
    [
      { stepValue: 'C', octave: 4, integer: -2 },
      new Pitch({ stepValue: 'C', octave: 4, accidental: 'dflat' }),
    ],
    [
      { stepValue: 'C', octave: 4, integer: -1 },
      new Pitch({ stepValue: 'C', octave: 4, accidental: 'flat' }),
    ],
    [
      { stepValue: 'C', octave: 4, integer: 0 },
      new Pitch({ stepValue: 'C', octave: 4, accidental: undefined }),
    ],
    [
      { stepValue: 'C', octave: 4, integer: 1 },
      new Pitch({ stepValue: 'C', octave: 4, accidental: 'sharp' }),
    ],
    [
      { stepValue: 'C', octave: 4, integer: 2 },
      new Pitch({ stepValue: 'C', octave: 4, accidental: 'dsharp' }),
    ],
    [
      { stepValue: 'C', octave: 5, integer: 10 },
      new Pitch({ stepValue: 'C', octave: 5, accidental: 'dflat' }),
    ],
    [
      { stepValue: 'C', octave: 5, integer: 11 },
      new Pitch({ stepValue: 'C', octave: 5, accidental: 'flat' }),
    ],
    [
      { stepValue: 'C', octave: 5, integer: 12 },
      new Pitch({ stepValue: 'C', octave: 5, accidental: undefined }),
    ],
    [
      { stepValue: 'C', octave: 5, integer: 13 },
      new Pitch({ stepValue: 'C', octave: 5, accidental: 'sharp' }),
    ],
    [
      { stepValue: 'C', octave: 5, integer: 14 },
      new Pitch({ stepValue: 'C', octave: 5, accidental: 'dsharp' }),
    ],
    [
      { stepValue: 'B', octave: 4, integer: 9 },
      new Pitch({ stepValue: 'B', octave: 4, accidental: 'dflat' }),
    ],
    [
      { stepValue: 'B', octave: 4, integer: 10 },
      new Pitch({ stepValue: 'B', octave: 4, accidental: 'flat' }),
    ],
    [
      { stepValue: 'B', octave: 4, integer: 11 },
      new Pitch({ stepValue: 'B', octave: 4, accidental: undefined }),
    ],
    [
      { stepValue: 'B', octave: 4, integer: 12 },
      new Pitch({ stepValue: 'B', octave: 4, accidental: 'sharp' }),
    ],
    [
      { stepValue: 'B', octave: 4, integer: 13 },
      new Pitch({ stepValue: 'B', octave: 4, accidental: 'dsharp' }),
    ],
    [
      { stepValue: 'B', octave: 3, integer: -3 },
      new Pitch({ stepValue: 'B', octave: 3, accidental: 'dflat' }),
    ],
    [
      { stepValue: 'B', octave: 3, integer: -2 },
      new Pitch({ stepValue: 'B', octave: 3, accidental: 'flat' }),
    ],
    [
      { stepValue: 'B', octave: 3, integer: -1 },
      new Pitch({ stepValue: 'B', octave: 3, accidental: undefined }),
    ],
    [
      { stepValue: 'B', octave: 3, integer: 0 },
      new Pitch({ stepValue: 'B', octave: 3, accidental: 'sharp' }),
    ],
    [
      { stepValue: 'B', octave: 3, integer: 1 },
      new Pitch({ stepValue: 'B', octave: 3, accidental: 'dsharp' }),
    ],
    // 不正なピッチクラスが指定されたらナチュラルを返す
    [
      { stepValue: 'C', octave: 4, integer: 3 },
      new Pitch({ stepValue: 'C', octave: 4, accidental: undefined }),
    ],
  ])('pitch', (input, expected) => {
    const result = pitch(input);
    expect(result).toStrictEqual(expected);
  });

  test('Pitch', () => {
    let pitch = new Pitch({
      stepValue: 'B',
      octave: 4,
      accidental: undefined,
    });
    expect(pitch.getName('ja')).toBe('シ');
    expect(pitch.getName('en')).toBe('B');
    expect(pitch.getName('de')).toBe('H');
    expect(pitch.octave).toBe(4);
    expect(pitch.integer).toBe(11);
    expect(pitch.accidental).toBe(undefined);
    expect(pitch.position).toBe(3);

    pitch = new Pitch({
      stepValue: 'B',
      octave: 4,
      accidental: 'flat',
    });
    expect(pitch.getName('ja')).toBe('シ♭');
    expect(pitch.getName('en')).toBe('B♭');
    expect(pitch.getName('de')).toBe('B');
    expect(pitch.octave).toBe(4);
    expect(pitch.integer).toBe(10);
    expect(pitch.accidental).toBe('flat');
    expect(pitch.position).toBe(3);

    pitch = new Pitch({
      stepValue: 'B',
      octave: 4,
      accidental: 'sharp',
    });
    expect(pitch.getName('ja')).toBe('シ♯');
    expect(pitch.getName('en')).toBe('B♯');
    expect(pitch.getName('de')).toBe('His');
    expect(pitch.octave).toBe(4);
    expect(pitch.integer).toBe(12);
    expect(pitch.accidental).toBe('sharp');
    expect(pitch.position).toBe(3);

    pitch = new Pitch({
      stepValue: 'C',
      octave: 4,
      accidental: 'dflat',
    });
    expect(pitch.getName('ja')).toBe('ド♭♭');
    expect(pitch.getName('en')).toBe('C♭♭');
    expect(pitch.getName('de')).toBe('Ceses');
    expect(pitch.octave).toBe(4);
    expect(pitch.integer).toBe(-2);
    expect(pitch.accidental).toBe('dflat');
    expect(pitch.position).toBe(0);

    pitch = new Pitch({
      stepValue: 'E',
      octave: 4,
      accidental: 'dflat',
    });
    expect(pitch.getName('ja')).toBe('ミ♭♭');
    expect(pitch.getName('en')).toBe('E♭♭');
    expect(pitch.getName('de')).toBe('Eses');
    expect(pitch.octave).toBe(4);
    expect(pitch.integer).toBe(2);
    expect(pitch.accidental).toBe('dflat');
    expect(pitch.position).toBe(1);

    pitch = new Pitch({
      stepValue: 'B',
      octave: 4,
      accidental: 'dflat',
    });
    expect(pitch.getName('ja')).toBe('シ♭♭');
    expect(pitch.getName('en')).toBe('B♭♭');
    expect(pitch.getName('de')).toBe('Heses');
    expect(pitch.octave).toBe(4);
    expect(pitch.integer).toBe(9);
    expect(pitch.accidental).toBe('dflat');
    expect(pitch.position).toBe(3);

    pitch = new Pitch({
      stepValue: 'B',
      octave: 4,
      accidental: 'dsharp',
    });
    expect(pitch.getName('ja')).toBe('シ♯♯');
    expect(pitch.getName('en')).toBe('B♯♯');
    expect(pitch.getName('de')).toBe('Hisis');
    expect(pitch.octave).toBe(4);
    expect(pitch.integer).toBe(13);
    expect(pitch.accidental).toBe('dsharp');
    expect(pitch.position).toBe(3);

    pitch = new Pitch({
      stepValue: 'E',
      octave: 4,
      accidental: 'flat',
    });
    expect(pitch.getName('ja')).toBe('ミ♭');
    expect(pitch.getName('en')).toBe('E♭');
    expect(pitch.getName('de')).toBe('Es');
    expect(pitch.octave).toBe(4);
    expect(pitch.integer).toBe(3);
    expect(pitch.accidental).toBe('flat');
    expect(pitch.position).toBe(1);

    pitch = new Pitch({
      stepValue: 'A',
      octave: 4,
      accidental: 'flat',
    });
    expect(pitch.getName('ja')).toBe('ラ♭');
    expect(pitch.getName('en')).toBe('A♭');
    expect(pitch.getName('de')).toBe('As');
    expect(pitch.octave).toBe(4);
    expect(pitch.integer).toBe(8);
    expect(pitch.accidental).toBe('flat');
    expect(pitch.position).toBe(2.5);

    pitch = new Pitch({
      stepValue: 'C',
      octave: 4,
      accidental: 'flat',
    });
    expect(pitch.getName('ja')).toBe('ド♭');
    expect(pitch.getName('en')).toBe('C♭');
    expect(pitch.getName('de')).toBe('Ces');
    expect(pitch.octave).toBe(4);
    expect(pitch.integer).toBe(-1);
    expect(pitch.accidental).toBe('flat');
    expect(pitch.position).toBe(0);
  });

  test('getAllPitchByKey', () => {
    const c = pitch({ stepValue: 'C' });
    const cb = pitch({ stepValue: 'C', accidental: 'flat' });
    const cbb = pitch({ stepValue: 'C', accidental: 'dflat' });
    const cs = pitch({ stepValue: 'C', accidental: 'sharp' });
    const css = pitch({ stepValue: 'C', accidental: 'dsharp' });

    const result = getAllPitchByKey();

    expect(result['c']).toStrictEqual(c);
    expect(result['cb']).toStrictEqual(cb);
    expect(result['c♭']).toStrictEqual(cb);
    expect(result['cbb']).toStrictEqual(cbb);
    expect(result['c♭♭']).toStrictEqual(cbb);
    expect(result['c#']).toStrictEqual(cs);
    expect(result['c♯']).toStrictEqual(cs);
    expect(result['c##']).toStrictEqual(css);
    expect(result['c♯♯']).toStrictEqual(css);
  });

  test('text2Pitch', () => {
    const c = pitch({ stepValue: 'C' });
    const cb = pitch({ stepValue: 'C', accidental: 'flat' });
    const cbb = pitch({ stepValue: 'C', accidental: 'dflat' });
    const cs = pitch({ stepValue: 'C', accidental: 'sharp' });
    const css = pitch({ stepValue: 'C', accidental: 'dsharp' });

    expect(text2pitch('c')).toStrictEqual(c);
    expect(text2pitch('cb')).toStrictEqual(cb);
    expect(text2pitch('cbb')).toStrictEqual(cbb);
    expect(text2pitch('c#')).toStrictEqual(cs);
    expect(text2pitch('c##')).toStrictEqual(css);
    expect(text2pitch('c♭')).toStrictEqual(cb);
    expect(text2pitch('c♭♭')).toStrictEqual(cbb);
    expect(text2pitch('c♯')).toStrictEqual(cs);
    expect(text2pitch('c♯♯')).toStrictEqual(css);

    // オクターブ
    expect(text2pitch('c5')).toStrictEqual(
      pitch({ stepValue: 'C', octave: 5 }),
    );
    expect(text2pitch('c5b')).toStrictEqual(
      pitch({ stepValue: 'C', octave: 5, accidental: 'flat' }),
    );
    expect(text2pitch('c5bb')).toStrictEqual(
      pitch({ stepValue: 'C', octave: 5, accidental: 'dflat' }),
    );
    expect(text2pitch('c10')).toStrictEqual(
      pitch({ stepValue: 'C', octave: 10 }),
    );

    // 不正
    expect(text2pitch('cc')).toStrictEqual(null);
  });

  test('text2Pitch octave', () => {
    expect(text2pitch('c5')).toStrictEqual(
      pitch({ stepValue: 'C', octave: 5 }),
    );
    expect(text2pitch('c5b')).toStrictEqual(
      pitch({ stepValue: 'C', octave: 5, accidental: 'flat' }),
    );
    expect(text2pitch('c5bb')).toStrictEqual(
      pitch({ stepValue: 'C', octave: 5, accidental: 'dflat' }),
    );
    expect(text2pitch('c10')).toStrictEqual(
      pitch({ stepValue: 'C', octave: 10 }),
    );
  });
});
