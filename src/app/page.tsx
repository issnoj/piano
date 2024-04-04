import { Staff } from '@/components/staff/staff';
import { piano } from '@/lib/piano';
import { Accidental, BaseNoteId, ScaleTypeId } from '@/lib/piano/types';

type Scale = {
  id: BaseNoteId;
  octave: number;
  accidental?: Accidental;
  type: ScaleTypeId;
};

// フラット系
const flatScales: Scale[] = [
  { id: 'c', octave: 4, type: 'major' },
  { id: 'a', octave: 3, type: 'minor' },
  { id: 'f', octave: 4, type: 'major' },
  { id: 'd', octave: 4, type: 'minor' },
  { id: 'b', octave: 3, accidental: 'flat', type: 'major' },
  { id: 'g', octave: 4, type: 'minor' },
  { id: 'e', octave: 4, accidental: 'flat', type: 'major' },
  { id: 'c', octave: 4, type: 'minor' },
  { id: 'a', octave: 3, accidental: 'flat', type: 'major' },
  { id: 'f', octave: 4, type: 'minor' },
  { id: 'd', octave: 4, accidental: 'flat', type: 'major' },
  { id: 'b', octave: 3, accidental: 'flat', type: 'minor' },
  { id: 'g', octave: 4, accidental: 'flat', type: 'major' },
  { id: 'e', octave: 4, accidental: 'flat', type: 'minor' },
];

// シャープ系
const sharpScales: Scale[] = [
  { id: 'b', octave: 3, type: 'major' },
  { id: 'g', octave: 4, accidental: 'sharp', type: 'minor' },
  { id: 'e', octave: 4, type: 'major' },
  { id: 'c', octave: 4, accidental: 'sharp', type: 'minor' },
  { id: 'a', octave: 3, type: 'major' },
  { id: 'f', octave: 4, accidental: 'sharp', type: 'minor' },
  { id: 'd', octave: 4, type: 'major' },
  { id: 'b', octave: 3, type: 'minor' },
  { id: 'g', octave: 4, type: 'major' },
  { id: 'e', octave: 4, type: 'minor' },
];

export default function Home() {
  return (
    <div className={'space-y-8 p-4'}>
      <h1 className="text-xl font-bold">Test</h1>
      <Staff
        id="test"
        chords={[
          {
            name: 'C',
            notes: [
              piano.note({ baseNoteId: 'c', octave: 3 }),
              piano.note({ baseNoteId: 'c', octave: 4 }),
              piano.note({ baseNoteId: 'c', octave: 5 }),
              piano.note({ baseNoteId: 'c', octave: 6 }),
            ],
          },
          {
            name: 'F♯',
            notes: [
              piano.note({ baseNoteId: 'f', octave: 4, accidental: 'sharp' }),
            ],
          },
          {
            name: 'B♭',
            notes: [
              piano.note({ baseNoteId: 'b', octave: 4, accidental: 'flat' }),
            ],
          },
          {
            name: 'F♯♯',
            notes: [
              piano.note({ baseNoteId: 'f', octave: 4, accidental: 'dsharp' }),
            ],
          },
          {
            name: 'A♭♭',
            notes: [
              piano.note({ baseNoteId: 'a', octave: 4, accidental: 'dflat' }),
            ],
          },
          {
            name: 'C7',
            notes: [
              piano.note(),
              piano.note({ baseNoteId: 'e' }),
              piano.note({ baseNoteId: 'g' }),
              piano.note({ baseNoteId: 'b', accidental: 'flat' }),
            ],
          },
          {
            name: 'Cdim',
            notes: [
              piano.note(),
              piano.note({ baseNoteId: 'e', accidental: 'flat' }),
              piano.note({ baseNoteId: 'g', accidental: 'flat' }),
              piano.note({ baseNoteId: 'b', accidental: 'dflat' }),
            ],
          },
          {
            name: 'Baug',
            notes: [
              piano.note({ baseNoteId: 'b', octave: 3 }),
              piano.note({ baseNoteId: 'd', accidental: 'sharp' }),
              piano.note({ baseNoteId: 'f', accidental: 'dsharp' }),
            ],
          },
        ]}
      />

      <h1 className={'text-xl font-bold'}>Scale</h1>
      <div className="flex gap-4">
        <table>
          <tbody>
            {flatScales.map((v, i) => {
              const pianoNote = piano.note({
                baseNoteId: v.id,
                octave: v.octave,
                accidental: v.accidental,
              });
              const scale = piano.scale(pianoNote, v.type);
              return (
                <tr key={i}>
                  <th className={'pr-8 pt-4 align-top'}>
                    {scale.name}
                    <br />
                    {scale.nameEn}
                    <br />
                    {scale.nameDe}
                  </th>
                  <td className="pb-8">
                    <Staff
                      chords={scale.notes.map((note) => ({
                        notes: [note],
                        name: note.getName('en'),
                      }))}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <table className="h-full">
          <tbody>
            {sharpScales.map((v, i) => {
              const pianoNote = piano.note({
                baseNoteId: v.id,
                octave: v.octave,
                accidental: v.accidental,
              });
              const scale = piano.scale(pianoNote, v.type);
              return (
                <tr key={i}>
                  <th className={'pr-8 pt-4 align-top'}>
                    {scale.name}
                    <br />
                    {scale.nameEn}
                    <br />
                    {scale.nameDe}
                  </th>
                  <td className="pb-8">
                    <Staff
                      chords={scale.notes.map((note) => ({
                        notes: [note],
                        name: note.getName('en'),
                      }))}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
