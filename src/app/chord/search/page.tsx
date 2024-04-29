import { piano } from '@/lib/piano';
import { Score } from '@/components/score/score';
import { Accidental, StepValue } from '@/lib/piano/types';

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
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold">コード検索</h2>
      <table>
        <tbody>
          {chords.map((v, i) => {
            const pianoNote = piano.pitch({
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
                  <Score
                    size={9}
                    id="test"
                    data={{
                      shards: [
                        {
                          measures: [
                            {
                              attributes: {
                                keySignature: { fifths: 0 },
                                showClef: true,
                              },
                              content: {
                                notes: [
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
                                  piano.chord(
                                    pianoNote,
                                    'halfDiminishedSeventh',
                                  ),
                                ].map((chord) => ({
                                  name: chord.name,
                                  pitches: chord.pitches,
                                })),
                              },
                            },
                          ],
                        },
                      ],
                    }}
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
