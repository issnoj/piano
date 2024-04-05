import { Staff } from '@/components/staff/staff';
import { piano } from '@/lib/piano';
import { Accidental, BaseNoteId } from '@/lib/piano/types';

type Chord = {
  id: BaseNoteId;
  octave: number;
  accidental?: Accidental;
};

// コード
const chords: Chord[] = [
  { id: 'c', octave: 4 },
  { id: 'd', octave: 4, accidental: 'flat' },
  { id: 'd', octave: 4 },
  { id: 'e', octave: 4, accidental: 'flat' },
  { id: 'e', octave: 4 },
  { id: 'f', octave: 4 },
  { id: 'f', octave: 4, accidental: 'sharp' },
  { id: 'g', octave: 4 },
  { id: 'a', octave: 4, accidental: 'flat' },
  { id: 'a', octave: 4 },
  { id: 'b', octave: 3, accidental: 'flat' },
  { id: 'b', octave: 3 },
];

export default function Page() {
  return (
    <div className={'space-y-8 p-4'}>
      <h1 className="text-xl font-bold">Chord</h1>
      <table>
        <tbody>
          {chords.map((v, i) => {
            const pianoNote = piano.note({
              baseNoteId: v.id,
              octave: v.octave,
              accidental: v.accidental,
            });
            return (
              <tr key={i}>
                <th className={'px-8 pt-10 align-top'}>
                  {pianoNote.getName('en')}
                </th>
                <td className="pb-8">
                  <Staff
                    size={9}
                    id="test"
                    noteAreaWidth={120}
                    chords={[
                      piano.chord(pianoNote, 'majorTriad'),
                      piano.chord(pianoNote, 'majorSixth'),
                      piano.chord(pianoNote, 'dominantSeventh'),
                      piano.chord(pianoNote, 'majorSeventh'),
                      piano.chord(pianoNote, 'augmentedTriad'),
                      piano.chord(pianoNote, 'augmentedSeventh'),
                      piano.chord(pianoNote, 'minorTriad'),
                      piano.chord(pianoNote, 'minorSixth'),
                      piano.chord(pianoNote, 'minorSeventh'),
                      piano.chord(pianoNote, 'minorMajorSeventh'),
                      piano.chord(pianoNote, 'diminishedTriad'),
                      piano.chord(pianoNote, 'diminishedSeventh'),
                      piano.chord(pianoNote, 'halfDiminishedSeventh'),
                    ]}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
