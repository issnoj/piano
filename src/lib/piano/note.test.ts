import { note, getBaseNoteByNumber, Note, getAccidental } from './note';

describe('piano.note', () => {
  test('getBaseNoteByNumber', () => {
    const baseNote = getBaseNoteByNumber(0);
    expect(baseNote?.id === 'c').toBe(true);
  });

  test('getAccidental', () => {
    for (let i = -10; i < 11; i++) {
      expect(getAccidental('c', -2 + i * 12)).toBe('dflat');
      expect(getAccidental('c', -1 + i * 12)).toBe('flat');
      expect(getAccidental('c', i * 12)).toBe(undefined);
      expect(getAccidental('c', 1 + i * 12)).toBe('sharp');
      expect(getAccidental('c', 2 + i * 12)).toBe('dsharp');

      expect(getAccidental('d', i * 12)).toBe('dflat');
      expect(getAccidental('d', 1 + i * 12)).toBe('flat');
      expect(getAccidental('d', 2 + i * 12)).toBe(undefined);
      expect(getAccidental('d', 3 + i * 12)).toBe('sharp');
      expect(getAccidental('d', 4 + i * 12)).toBe('dsharp');

      expect(getAccidental('e', 2 + i * 12)).toBe('dflat');
      expect(getAccidental('e', 3 + i * 12)).toBe('flat');
      expect(getAccidental('e', 4 + i * 12)).toBe(undefined);
      expect(getAccidental('e', 5 + i * 12)).toBe('sharp');
      expect(getAccidental('e', 6 + i * 12)).toBe('dsharp');

      expect(getAccidental('f', 3 + i * 12)).toBe('dflat');
      expect(getAccidental('f', 4 + i * 12)).toBe('flat');
      expect(getAccidental('f', 5 + i * 12)).toBe(undefined);
      expect(getAccidental('f', 6 + i * 12)).toBe('sharp');
      expect(getAccidental('f', 7 + i * 12)).toBe('dsharp');

      expect(getAccidental('g', 5 + i * 12)).toBe('dflat');
      expect(getAccidental('g', 6 + i * 12)).toBe('flat');
      expect(getAccidental('g', 7 + i * 12)).toBe(undefined);
      expect(getAccidental('g', 8 + i * 12)).toBe('sharp');
      expect(getAccidental('g', 9 + i * 12)).toBe('dsharp');

      expect(getAccidental('a', 7 + i * 12)).toBe('dflat');
      expect(getAccidental('a', 8 + i * 12)).toBe('flat');
      expect(getAccidental('a', 9 + i * 12)).toBe(undefined);
      expect(getAccidental('a', 10 + i * 12)).toBe('sharp');
      expect(getAccidental('a', 11 + i * 12)).toBe('dsharp');

      expect(getAccidental('b', 9 + i * 12)).toBe('dflat');
      expect(getAccidental('b', 10 + i * 12)).toBe('flat');
      expect(getAccidental('b', 11 + i * 12)).toBe(undefined);
      expect(getAccidental('b', 12 + i * 12)).toBe('sharp');
      expect(getAccidental('b', 13 + i * 12)).toBe('dsharp');
    }
  });

  test.each<[Parameters<typeof note>[number] | {}, Note]>([
    [
      undefined,
      new Note({ baseNoteId: 'c', octave: 4, accidental: undefined }),
    ],
    [
      { baseNoteId: 'd' },
      new Note({ baseNoteId: 'd', octave: 4, accidental: undefined }),
    ],
    [
      { baseNoteId: 'd', octave: 5 },
      new Note({ baseNoteId: 'd', octave: 5, accidental: undefined }),
    ],
    [
      { baseNoteId: 'd', octave: 6, accidental: 'sharp' },
      new Note({ baseNoteId: 'd', octave: 6, accidental: 'sharp' }),
    ],
    // ピッチクラスを指定
    [
      { baseNoteId: 'c', octave: 4, integer: -2 },
      new Note({ baseNoteId: 'c', octave: 4, accidental: 'dflat' }),
    ],
    [
      { baseNoteId: 'c', octave: 4, integer: -1 },
      new Note({ baseNoteId: 'c', octave: 4, accidental: 'flat' }),
    ],
    [
      { baseNoteId: 'c', octave: 4, integer: 0 },
      new Note({ baseNoteId: 'c', octave: 4, accidental: undefined }),
    ],
    [
      { baseNoteId: 'c', octave: 4, integer: 1 },
      new Note({ baseNoteId: 'c', octave: 4, accidental: 'sharp' }),
    ],
    [
      { baseNoteId: 'c', octave: 4, integer: 2 },
      new Note({ baseNoteId: 'c', octave: 4, accidental: 'dsharp' }),
    ],
    [
      { baseNoteId: 'c', octave: 5, integer: 10 },
      new Note({ baseNoteId: 'c', octave: 5, accidental: 'dflat' }),
    ],
    [
      { baseNoteId: 'c', octave: 5, integer: 11 },
      new Note({ baseNoteId: 'c', octave: 5, accidental: 'flat' }),
    ],
    [
      { baseNoteId: 'c', octave: 5, integer: 12 },
      new Note({ baseNoteId: 'c', octave: 5, accidental: undefined }),
    ],
    [
      { baseNoteId: 'c', octave: 5, integer: 13 },
      new Note({ baseNoteId: 'c', octave: 5, accidental: 'sharp' }),
    ],
    [
      { baseNoteId: 'c', octave: 5, integer: 14 },
      new Note({ baseNoteId: 'c', octave: 5, accidental: 'dsharp' }),
    ],
    [
      { baseNoteId: 'b', octave: 4, integer: 9 },
      new Note({ baseNoteId: 'b', octave: 4, accidental: 'dflat' }),
    ],
    [
      { baseNoteId: 'b', octave: 4, integer: 10 },
      new Note({ baseNoteId: 'b', octave: 4, accidental: 'flat' }),
    ],
    [
      { baseNoteId: 'b', octave: 4, integer: 11 },
      new Note({ baseNoteId: 'b', octave: 4, accidental: undefined }),
    ],
    [
      { baseNoteId: 'b', octave: 4, integer: 12 },
      new Note({ baseNoteId: 'b', octave: 4, accidental: 'sharp' }),
    ],
    [
      { baseNoteId: 'b', octave: 4, integer: 13 },
      new Note({ baseNoteId: 'b', octave: 4, accidental: 'dsharp' }),
    ],
    [
      { baseNoteId: 'b', octave: 3, integer: -3 },
      new Note({ baseNoteId: 'b', octave: 3, accidental: 'dflat' }),
    ],
    [
      { baseNoteId: 'b', octave: 3, integer: -2 },
      new Note({ baseNoteId: 'b', octave: 3, accidental: 'flat' }),
    ],
    [
      { baseNoteId: 'b', octave: 3, integer: -1 },
      new Note({ baseNoteId: 'b', octave: 3, accidental: undefined }),
    ],
    [
      { baseNoteId: 'b', octave: 3, integer: 0 },
      new Note({ baseNoteId: 'b', octave: 3, accidental: 'sharp' }),
    ],
    [
      { baseNoteId: 'b', octave: 3, integer: 1 },
      new Note({ baseNoteId: 'b', octave: 3, accidental: 'dsharp' }),
    ],
    // 不正なピッチクラスが指定されたらナチュラルを返す
    [
      { baseNoteId: 'c', octave: 4, integer: 3 },
      new Note({ baseNoteId: 'c', octave: 4, accidental: undefined }),
    ],
  ])('note', (input, expected) => {
    const result = note(input);
    expect(result).toStrictEqual(expected);
  });

  test('Note', () => {
    let note = new Note({
      baseNoteId: 'b',
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
      baseNoteId: 'b',
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
      baseNoteId: 'b',
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
      baseNoteId: 'b',
      octave: 4,
      accidental: 'dflat',
    });
    expect(note.number).toBe(6);
    expect(note.getName('ja')).toBe('シ♭♭');
    expect(note.getName('en')).toBe('B♭♭');
    expect(note.getName('de')).toBe('H♭♭');
    expect(note.octave).toBe(4);
    expect(note.integer).toBe(9);
    expect(note.position).toBe(3);
    expect(note.accidental).toBe('dflat');

    note = new Note({
      baseNoteId: 'b',
      octave: 4,
      accidental: 'dsharp',
    });
    expect(note.number).toBe(6);
    expect(note.getName('ja')).toBe('シ♯♯');
    expect(note.getName('en')).toBe('B♯♯');
    expect(note.getName('de')).toBe('H♯♯');
    expect(note.octave).toBe(4);
    expect(note.integer).toBe(13);
    expect(note.position).toBe(3);
    expect(note.accidental).toBe('dsharp');

    note = new Note({
      baseNoteId: 'e',
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
      baseNoteId: 'a',
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
      baseNoteId: 'c',
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
});
