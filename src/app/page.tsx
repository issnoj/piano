import { Staff } from '@/components/staff/staff';
import { piano } from '@/lib/piano';
import { Note } from '@/lib/piano/note';
import { Scale, Chord } from '@/lib/piano/types';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className={'space-y-8 p-4'}>
      <h1 className="text-xl font-bold">Test</h1>
      <Staff
        chords={[
          piano.chord(piano.note({ stepValue: 'F', octave: 4 }), 'majorTriad'),
          piano.chord(piano.note({ stepValue: 'F', octave: 4 }), 'sus4'),
          piano.chord(piano.note({ stepValue: 'F', octave: 4 }), 'add9'),
          piano.chord(
            piano.note({ stepValue: 'F', octave: 4 }),
            'majorTriad',
            2,
          ),
          piano.chord(piano.note({ stepValue: 'C', octave: 4 }), 'majorTriad'),
        ]}
      />
      <Staff
        id="test"
        chords={[
          {
            name: 'F♯',
            notes: [piano.text2Note('f#') as Note],
          },
          {
            name: 'B♭',
            notes: [piano.text2Note('bb') as Note],
          },
          {
            name: 'F♯♯',
            notes: [piano.text2Note('f##') as Note],
          },
          {
            name: 'A♭♭',
            notes: [piano.text2Note('abb') as Note],
          },
          piano.text2Chord('c') as Chord,
          piano.text2Chord('c7') as Chord,
          piano.text2Chord('cdim7') as Chord,
          piano.text2Chord('baug') as Chord,
          piano.text2Chord('d7/c') as Chord,
        ]}
      />
      <Staff
        keySignature={{ fifths: -5 }}
        chords={[
          {
            name: 'C',
            notes: [
              piano.note({ stepValue: 'C', octave: 2 }),
              piano.note({ stepValue: 'C', octave: 3 }),
              piano.note({ stepValue: 'C', octave: 4 }),
              piano.note({ stepValue: 'C', octave: 5 }),
              piano.note({ stepValue: 'C', octave: 6 }),
              piano.note({ stepValue: 'C', octave: 7 }),
            ],
          },
          {
            name: 'C',
            notes: [
              piano.text2Note('c3#') as Note,
              piano.text2Note('c4#') as Note,
              piano.text2Note('c5#') as Note,
              piano.text2Note('c6#') as Note,
            ],
          },
          {
            name: 'C D E F G A B',
            notes: [
              piano.text2Note('c') as Note,
              piano.text2Note('d') as Note,
              piano.text2Note('e') as Note,
              piano.text2Note('f') as Note,
              piano.text2Note('g') as Note,
              piano.text2Note('a') as Note,
              piano.text2Note('b') as Note,
              piano.text2Note('c5') as Note,
              piano.text2Note('d5') as Note,
              piano.text2Note('e5') as Note,
              piano.text2Note('f5') as Note,
              piano.text2Note('g5') as Note,
              piano.text2Note('a5') as Note,
              piano.text2Note('b5') as Note,
            ],
          },
        ]}
      />
      <CircleOfFifths />
    </div>
  );
}

const flatMajorScales = [
  piano.note({ stepValue: 'C' }),
  piano.note({ stepValue: 'F' }),
  piano.note({ stepValue: 'B', accidental: 'flat' }),
  piano.note({ stepValue: 'E', accidental: 'flat' }),
  piano.note({ stepValue: 'A', accidental: 'flat' }),
  piano.note({ stepValue: 'D', accidental: 'flat' }),
  piano.note({ stepValue: 'G', accidental: 'flat' }),
].map((note) => piano.scale(note, 'major') as Scale);

const flatMinorScales = [
  piano.note({ stepValue: 'A' }),
  piano.note({ stepValue: 'D' }),
  piano.note({ stepValue: 'G' }),
  piano.note({ stepValue: 'C' }),
  piano.note({ stepValue: 'F' }),
  piano.note({ stepValue: 'B', accidental: 'flat' }),
  piano.note({ stepValue: 'E', accidental: 'flat' }),
].map((note) => piano.scale(note, 'minor') as Scale);

const sharpMajorScales = [
  piano.note({ stepValue: 'B' }),
  piano.note({ stepValue: 'E' }),
  piano.note({ stepValue: 'A' }),
  piano.note({ stepValue: 'D' }),
  piano.note({ stepValue: 'G' }),
].map((note) => piano.scale(note, 'major') as Scale);

const sharpMinorScales = [
  piano.note({ stepValue: 'G', accidental: 'sharp' }),
  piano.note({ stepValue: 'C', accidental: 'sharp' }),
  piano.note({ stepValue: 'F', accidental: 'sharp' }),
  piano.note({ stepValue: 'B' }),
  piano.note({ stepValue: 'E' }),
].map((note) => piano.scale(note, 'minor') as Scale);

const CircleOfFifths = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-bold">フラット系</h1>
      <div
        className={cn(
          'flex items-center gap-6 border-l-8 border-gray-600/50 px-4 py-2',
        )}
      >
        <div className="whitespace-nowrap font-bold">長調</div>
        <div className="flex gap-2">
          {flatMajorScales.map((scale, i) => (
            <div key={i}>
              <Staff
                size={10}
                minWidth={250}
                keySignature={{ fifths: scale.fifths }}
              />
              <div className="text-center font-bold">{scale.shortName}</div>
              <div className="text-center text-xs">{scale.nameEn}</div>
              <div className="text-center text-xs">{scale.nameDe}</div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={cn(
          'flex items-center gap-6 border-l-8  border-orange-600/50 px-4 py-2',
        )}
      >
        <div className="whitespace-nowrap font-bold">短調</div>
        <div className="flex gap-2">
          {flatMinorScales.map((scale, i) => (
            <div key={i}>
              <Staff
                size={10}
                minWidth={250}
                keySignature={{ fifths: scale.fifths }}
              />
              <div className="text-center font-bold">{scale.shortName}</div>
              <div className="text-center text-xs">{scale.nameEn}</div>
              <div className="text-center text-xs">{scale.nameDe}</div>
            </div>
          ))}
        </div>
      </div>
      <h1 className="text-xl font-bold">シャープ系</h1>
      <div
        className={cn(
          'flex items-center gap-6 border-l-8 border-gray-600/50 px-4 py-2',
        )}
      >
        <div className="whitespace-nowrap font-bold">長調</div>
        <div className="flex gap-2">
          {sharpMajorScales.map((scale, i) => (
            <div key={i}>
              <Staff
                size={10}
                minWidth={250}
                keySignature={{ fifths: scale.fifths }}
              />
              <div className="text-center font-bold">{scale.shortName}</div>
              <div className="text-center text-xs">{scale.nameEn}</div>
              <div className="text-center text-xs">{scale.nameDe}</div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={cn(
          'flex items-center gap-6 border-l-8  border-orange-600/50 px-4 py-2',
        )}
      >
        <div className="whitespace-nowrap font-bold">短調</div>
        <div className="flex gap-2">
          {sharpMinorScales.map((scale, i) => (
            <div key={i}>
              <Staff
                size={10}
                minWidth={250}
                keySignature={{ fifths: scale.fifths }}
              />
              <div className="text-center font-bold">{scale.shortName}</div>
              <div className="text-center text-xs">{scale.nameEn}</div>
              <div className="text-center text-xs">{scale.nameDe}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
