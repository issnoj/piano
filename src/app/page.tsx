import { Staff } from '@/components/staff/staff';
import { piano } from '@/lib/piano';

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
    </div>
  );
}
