import { Staff } from '@/components/staff/staff';
import { piano } from '@/lib/piano';
import { Scale } from '@/lib/piano/types';
import { cn } from '@/lib/utils';

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
              piano.note({ stepValue: 'C', octave: 3 }),
              piano.note({ stepValue: 'C', octave: 4 }),
              piano.note({ stepValue: 'C', octave: 5 }),
              piano.note({ stepValue: 'C', octave: 6 }),
            ],
          },
          {
            name: 'F♯',
            notes: [
              piano.note({ stepValue: 'F', octave: 4, accidental: 'sharp' }),
            ],
          },
          {
            name: 'B♭',
            notes: [
              piano.note({ stepValue: 'B', octave: 4, accidental: 'flat' }),
            ],
          },
          {
            name: 'F♯♯',
            notes: [
              piano.note({ stepValue: 'F', octave: 4, accidental: 'dsharp' }),
            ],
          },
          {
            name: 'A♭♭',
            notes: [
              piano.note({ stepValue: 'A', octave: 4, accidental: 'dflat' }),
            ],
          },
          {
            name: 'C7',
            notes: [
              piano.note(),
              piano.note({ stepValue: 'E' }),
              piano.note({ stepValue: 'G' }),
              piano.note({ stepValue: 'B', accidental: 'flat' }),
            ],
          },
          {
            name: 'Cdim',
            notes: [
              piano.note(),
              piano.note({ stepValue: 'E', accidental: 'flat' }),
              piano.note({ stepValue: 'G', accidental: 'flat' }),
              piano.note({ stepValue: 'B', accidental: 'dflat' }),
            ],
          },
          {
            name: 'Baug',
            notes: [
              piano.note({ stepValue: 'B', octave: 3 }),
              piano.note({ stepValue: 'D', accidental: 'sharp' }),
              piano.note({ stepValue: 'F', accidental: 'dsharp' }),
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
