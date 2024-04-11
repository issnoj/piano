import { Staff } from '@/components/staff/staff';
import { piano } from '@/lib/piano';
import { Accidental, StepValue } from '@/lib/piano/types';
import { InputChord } from './input-chord';

type Chord = {
  id: StepValue;
  octave: number;
  accidental?: Accidental;
};

// コード
const chords: Chord[] = [
  { id: 'C', octave: 4 },
  { id: 'D', octave: 4, accidental: 'flat' },
  { id: 'D', octave: 4 },
  { id: 'E', octave: 4, accidental: 'flat' },
  { id: 'E', octave: 4 },
  { id: 'F', octave: 4 },
  { id: 'F', octave: 4, accidental: 'sharp' },
  { id: 'G', octave: 4 },
  { id: 'A', octave: 4, accidental: 'flat' },
  { id: 'A', octave: 4 },
  { id: 'B', octave: 3, accidental: 'flat' },
  { id: 'B', octave: 3 },
];

export default function Page() {
  return (
    <div className={'space-y-8 p-4'}>
      <InputChord />
      <h1 className="text-xl font-bold">Chord</h1>
      <table>
        <tbody>
          {chords.map((v, i) => {
            const pianoNote = piano.note({
              stepValue: v.id,
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
