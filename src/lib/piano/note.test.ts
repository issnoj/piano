import {
  note,
  getBaseNoteByNumber,
  Note,
  getAccidental,
  text2Note,
  getAllNoteByKey,
} from './note';

describe('piano.note', () => {
  test('getBaseNoteByNumber', () => {
    const baseNote = getBaseNoteByNumber(0);
    expect(baseNote?.value === 'C').toBe(true);
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

  test.each<[Parameters<typeof note>[number] | {}, Note]>([
    [undefined, new Note({ stepValue: 'C', octave: 4, accidental: undefined })],
    [
      { stepValue: 'D' },
      new Note({ stepValue: 'D', octave: 4, accidental: undefined }),
    ],
    [
      { stepValue: 'D', octave: 5 },
      new Note({ stepValue: 'D', octave: 5, accidental: undefined }),
    ],
    [
      { stepValue: 'D', octave: 6, accidental: 'sharp' },
      new Note({ stepValue: 'D', octave: 6, accidental: 'sharp' }),
    ],
    // ピッチクラスを指定
    [
      { stepValue: 'C', octave: 4, integer: -2 },
      new Note({ stepValue: 'C', octave: 4, accidental: 'dflat' }),
    ],
    [
      { stepValue: 'C', octave: 4, integer: -1 },
      new Note({ stepValue: 'C', octave: 4, accidental: 'flat' }),
    ],
    [
      { stepValue: 'C', octave: 4, integer: 0 },
      new Note({ stepValue: 'C', octave: 4, accidental: undefined }),
    ],
    [
      { stepValue: 'C', octave: 4, integer: 1 },
      new Note({ stepValue: 'C', octave: 4, accidental: 'sharp' }),
    ],
    [
      { stepValue: 'C', octave: 4, integer: 2 },
      new Note({ stepValue: 'C', octave: 4, accidental: 'dsharp' }),
    ],
    [
      { stepValue: 'C', octave: 5, integer: 10 },
      new Note({ stepValue: 'C', octave: 5, accidental: 'dflat' }),
    ],
    [
      { stepValue: 'C', octave: 5, integer: 11 },
      new Note({ stepValue: 'C', octave: 5, accidental: 'flat' }),
    ],
    [
      { stepValue: 'C', octave: 5, integer: 12 },
      new Note({ stepValue: 'C', octave: 5, accidental: undefined }),
    ],
    [
      { stepValue: 'C', octave: 5, integer: 13 },
      new Note({ stepValue: 'C', octave: 5, accidental: 'sharp' }),
    ],
    [
      { stepValue: 'C', octave: 5, integer: 14 },
      new Note({ stepValue: 'C', octave: 5, accidental: 'dsharp' }),
    ],
    [
      { stepValue: 'B', octave: 4, integer: 9 },
      new Note({ stepValue: 'B', octave: 4, accidental: 'dflat' }),
    ],
    [
      { stepValue: 'B', octave: 4, integer: 10 },
      new Note({ stepValue: 'B', octave: 4, accidental: 'flat' }),
    ],
    [
      { stepValue: 'B', octave: 4, integer: 11 },
      new Note({ stepValue: 'B', octave: 4, accidental: undefined }),
    ],
    [
      { stepValue: 'B', octave: 4, integer: 12 },
      new Note({ stepValue: 'B', octave: 4, accidental: 'sharp' }),
    ],
    [
      { stepValue: 'B', octave: 4, integer: 13 },
      new Note({ stepValue: 'B', octave: 4, accidental: 'dsharp' }),
    ],
    [
      { stepValue: 'B', octave: 3, integer: -3 },
      new Note({ stepValue: 'B', octave: 3, accidental: 'dflat' }),
    ],
    [
      { stepValue: 'B', octave: 3, integer: -2 },
      new Note({ stepValue: 'B', octave: 3, accidental: 'flat' }),
    ],
    [
      { stepValue: 'B', octave: 3, integer: -1 },
      new Note({ stepValue: 'B', octave: 3, accidental: undefined }),
    ],
    [
      { stepValue: 'B', octave: 3, integer: 0 },
      new Note({ stepValue: 'B', octave: 3, accidental: 'sharp' }),
    ],
    [
      { stepValue: 'B', octave: 3, integer: 1 },
      new Note({ stepValue: 'B', octave: 3, accidental: 'dsharp' }),
    ],
    // 不正なピッチクラスが指定されたらナチュラルを返す
    [
      { stepValue: 'C', octave: 4, integer: 3 },
      new Note({ stepValue: 'C', octave: 4, accidental: undefined }),
    ],
  ])('note', (input, expected) => {
    const result = note(input);
    expect(result).toStrictEqual(expected);
  });

  test('Note', () => {
    let note = new Note({
      stepValue: 'B',
      octave: 4,
      accidental: undefined,
    });
    expect(note.number).toBe(6);
    expect(note.getName('ja')).toBe('シ');
    expect(note.getName('en')).toBe('B');
    expect(note.getName('de')).toBe('H');
    expect(note.octave).toBe(4);
    expect(note.integer).toBe(11);
    expect(note.position).toBe(3);
    expect(note.accidental).toBe(undefined);

    note = new Note({
      stepValue: 'B',
      octave: 4,
      accidental: 'flat',
    });
    expect(note.number).toBe(6);
    expect(note.getName('ja')).toBe('シ♭');
    expect(note.getName('en')).toBe('B♭');
    expect(note.getName('de')).toBe('B');
    expect(note.octave).toBe(4);
    expect(note.integer).toBe(10);
    expect(note.position).toBe(3);
    expect(note.accidental).toBe('flat');

    note = new Note({
      stepValue: 'B',
      octave: 4,
      accidental: 'sharp',
    });
    expect(note.number).toBe(6);
    expect(note.getName('ja')).toBe('シ♯');
    expect(note.getName('en')).toBe('B♯');
    expect(note.getName('de')).toBe('His');
    expect(note.octave).toBe(4);
    expect(note.integer).toBe(12);
    expect(note.position).toBe(3);
    expect(note.accidental).toBe('sharp');

    note = new Note({
      stepValue: 'C',
      octave: 4,
      accidental: 'dflat',
    });
    expect(note.number).toBe(0);
    expect(note.getName('ja')).toBe('ド♭♭');
    expect(note.getName('en')).toBe('C♭♭');
    expect(note.getName('de')).toBe('Ceses');
    expect(note.octave).toBe(4);
    expect(note.integer).toBe(-2);
    expect(note.position).toBe(0);
    expect(note.accidental).toBe('dflat');

    note = new Note({
      stepValue: 'E',
      octave: 4,
      accidental: 'dflat',
    });
    expect(note.number).toBe(2);
    expect(note.getName('ja')).toBe('ミ♭♭');
    expect(note.getName('en')).toBe('E♭♭');
    expect(note.getName('de')).toBe('Eses');
    expect(note.octave).toBe(4);
    expect(note.integer).toBe(2);
    expect(note.position).toBe(1);
    expect(note.accidental).toBe('dflat');

    note = new Note({
      stepValue: 'B',
      octave: 4,
      accidental: 'dflat',
    });
    expect(note.number).toBe(6);
    expect(note.getName('ja')).toBe('シ♭♭');
    expect(note.getName('en')).toBe('B♭♭');
    expect(note.getName('de')).toBe('Heses');
    expect(note.octave).toBe(4);
    expect(note.integer).toBe(9);
    expect(note.position).toBe(3);
    expect(note.accidental).toBe('dflat');

    note = new Note({
      stepValue: 'B',
      octave: 4,
      accidental: 'dsharp',
    });
    expect(note.number).toBe(6);
    expect(note.getName('ja')).toBe('シ♯♯');
    expect(note.getName('en')).toBe('B♯♯');
    expect(note.getName('de')).toBe('Hisis');
    expect(note.octave).toBe(4);
    expect(note.integer).toBe(13);
    expect(note.position).toBe(3);
    expect(note.accidental).toBe('dsharp');

    note = new Note({
      stepValue: 'E',
      octave: 4,
      accidental: 'flat',
    });
    expect(note.number).toBe(2);
    expect(note.getName('ja')).toBe('ミ♭');
    expect(note.getName('en')).toBe('E♭');
    expect(note.getName('de')).toBe('Es');
    expect(note.octave).toBe(4);
    expect(note.integer).toBe(3);
    expect(note.position).toBe(1);
    expect(note.accidental).toBe('flat');

    note = new Note({
      stepValue: 'A',
      octave: 4,
      accidental: 'flat',
    });
    expect(note.number).toBe(5);
    expect(note.getName('ja')).toBe('ラ♭');
    expect(note.getName('en')).toBe('A♭');
    expect(note.getName('de')).toBe('As');
    expect(note.octave).toBe(4);
    expect(note.integer).toBe(8);
    expect(note.position).toBe(2.5);
    expect(note.accidental).toBe('flat');

    note = new Note({
      stepValue: 'C',
      octave: 4,
      accidental: 'flat',
    });
    expect(note.number).toBe(0);
    expect(note.getName('ja')).toBe('ド♭');
    expect(note.getName('en')).toBe('C♭');
    expect(note.getName('de')).toBe('Ces');
    expect(note.octave).toBe(4);
    expect(note.integer).toBe(-1);
    expect(note.position).toBe(0);
    expect(note.accidental).toBe('flat');
  });

  test('getAllNoteByKey', () => {
    const c = note({ stepValue: 'C' });
    const cb = note({ stepValue: 'C', accidental: 'flat' });
    const cbb = note({ stepValue: 'C', accidental: 'dflat' });
    const cs = note({ stepValue: 'C', accidental: 'sharp' });
    const css = note({ stepValue: 'C', accidental: 'dsharp' });

    const result = getAllNoteByKey();

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

  test('text2Note', () => {
    const c = note({ stepValue: 'C' });
    const cb = note({ stepValue: 'C', accidental: 'flat' });
    const cbb = note({ stepValue: 'C', accidental: 'dflat' });
    const cs = note({ stepValue: 'C', accidental: 'sharp' });
    const css = note({ stepValue: 'C', accidental: 'dsharp' });

    expect(text2Note('c')).toStrictEqual(c);
    expect(text2Note('cb')).toStrictEqual(cb);
    expect(text2Note('cbb')).toStrictEqual(cbb);
    expect(text2Note('c#')).toStrictEqual(cs);
    expect(text2Note('c##')).toStrictEqual(css);
    expect(text2Note('c♭')).toStrictEqual(cb);
    expect(text2Note('c♭♭')).toStrictEqual(cbb);
    expect(text2Note('c♯')).toStrictEqual(cs);
    expect(text2Note('c♯♯')).toStrictEqual(css);

    // オクターブ
    expect(text2Note('c5')).toStrictEqual(note({ stepValue: 'C', octave: 5 }));
    expect(text2Note('c5b')).toStrictEqual(
      note({ stepValue: 'C', octave: 5, accidental: 'flat' }),
    );
    expect(text2Note('c5bb')).toStrictEqual(
      note({ stepValue: 'C', octave: 5, accidental: 'dflat' }),
    );
    expect(text2Note('c10')).toStrictEqual(
      note({ stepValue: 'C', octave: 10 }),
    );

    // 不正
    expect(text2Note('cc')).toStrictEqual(null);
  });

  test('text2Note octave', () => {
    expect(text2Note('c5')).toStrictEqual(note({ stepValue: 'C', octave: 5 }));
    expect(text2Note('c5b')).toStrictEqual(
      note({ stepValue: 'C', octave: 5, accidental: 'flat' }),
    );
    expect(text2Note('c5bb')).toStrictEqual(
      note({ stepValue: 'C', octave: 5, accidental: 'dflat' }),
    );
    expect(text2Note('c10')).toStrictEqual(
      note({ stepValue: 'C', octave: 10 }),
    );
  });
});
