import { Score } from '@/components/score/score';
import { piano } from '@/lib/piano';
import { Pitch } from '@/lib/piano/pitch';
import { Scale, Chord } from '@/lib/piano/types';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className={'flex flex-col gap-20 p-5'}>
      <h1 className="text-xl font-bold">Test</h1>
      <Score
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
                      {
                        name: '',
                        pitches: [piano.text2pitch('a3') as Pitch],
                      },
                      {
                        name: '',
                        pitches: [piano.text2pitch('c6') as Pitch],
                      },
                      {
                        name: '',
                        pitches: [
                          piano.text2pitch('c5#') as Pitch,
                          piano.text2pitch('d5#') as Pitch,
                          piano.text2pitch('e5#') as Pitch,
                          piano.text2pitch('f5#') as Pitch,
                          piano.text2pitch('g5#') as Pitch,
                        ],
                      },
                      {
                        name: '',
                        pitches: [
                          piano.text2pitch('f4b') as Pitch,
                          piano.text2pitch('g4b') as Pitch,
                          piano.text2pitch('a4b') as Pitch,
                          piano.text2pitch('b4b') as Pitch,
                          piano.text2pitch('c5b') as Pitch,
                        ],
                      },
                    ],
                  },
                },
              ],
            },
            {
              measures: [
                {
                  attributes: {
                    keySignature: { fifths: -6 },
                    showClef: true,
                  },
                  content: {
                    notes: [
                      {
                        name: '',
                        pitches: [piano.text2pitch('c') as Pitch],
                      },
                      piano.chord(
                        piano.pitch({ stepValue: 'F', octave: 4 }),
                        'majorTriad',
                      ),
                      piano.chord(
                        piano.pitch({ stepValue: 'F', octave: 4 }),
                        'sus4',
                      ),
                      piano.chord(
                        piano.pitch({ stepValue: 'F', octave: 4 }),
                        'add9',
                      ),
                      piano.chord(
                        piano.pitch({ stepValue: 'F', octave: 4 }),
                        'majorTriad',
                        2,
                      ),
                      piano.chord(
                        piano.pitch({ stepValue: 'A', octave: 4 }),
                        'majorTriad',
                      ),
                    ],
                  },
                },
              ],
            },
          ],
        }}
      />
      <Score
        id="test"
        data={{
          shards: [
            {
              measures: [
                {
                  attributes: {
                    keySignature: { fifths: 6 },
                    showClef: true,
                  },
                  content: {
                    notes: [
                      {
                        name: 'F♯',
                        pitches: [piano.text2pitch('f#') as Pitch],
                      },
                      {
                        name: 'B♭',
                        pitches: [piano.text2pitch('bb') as Pitch],
                      },
                      {
                        name: 'F♯♯',
                        pitches: [piano.text2pitch('f##') as Pitch],
                      },
                      {
                        name: 'A♭♭',
                        pitches: [piano.text2pitch('abb') as Pitch],
                      },
                      piano.text2Chord('c') as Chord,
                      piano.text2Chord('c7') as Chord,
                      piano.text2Chord('cdim7') as Chord,
                      piano.text2Chord('baug') as Chord,
                      piano.text2Chord('d7/c') as Chord,
                    ],
                  },
                },
              ],
            },
          ],
        }}
      />
      <Score
        data={{
          shards: [
            {
              measures: [
                {
                  attributes: {
                    keySignature: { fifths: -5 },
                    showClef: true,
                  },
                  content: {
                    notes: [
                      {
                        name: 'C',
                        pitches: [
                          piano.pitch({ stepValue: 'C', octave: 2 }),
                          piano.pitch({ stepValue: 'C', octave: 3 }),
                          piano.pitch({ stepValue: 'C', octave: 4 }),
                          piano.pitch({ stepValue: 'C', octave: 5 }),
                          piano.pitch({ stepValue: 'C', octave: 6 }),
                          piano.pitch({ stepValue: 'C', octave: 7 }),
                        ],
                      },
                      {
                        name: 'C',
                        pitches: [
                          piano.text2pitch('c3#') as Pitch,
                          piano.text2pitch('c4#') as Pitch,
                          piano.text2pitch('c5#') as Pitch,
                          piano.text2pitch('c6#') as Pitch,
                        ],
                      },
                      {
                        name: 'C2 D2 B6 C7',
                        pitches: [
                          piano.pitch({ stepValue: 'C', octave: 2 }),
                          piano.pitch({ stepValue: 'D', octave: 2 }),
                          piano.pitch({ stepValue: 'B', octave: 6 }),
                          piano.pitch({ stepValue: 'C', octave: 7 }),
                        ],
                      },
                      {
                        name: 'C D E F G A B',
                        pitches: [
                          piano.text2pitch('c3#') as Pitch,
                          piano.text2pitch('d3#') as Pitch,
                          piano.text2pitch('e3#') as Pitch,
                          piano.text2pitch('f3#') as Pitch,
                          piano.text2pitch('g3#') as Pitch,
                          piano.text2pitch('a3#') as Pitch,
                          piano.text2pitch('b3#') as Pitch,
                          piano.text2pitch('c##') as Pitch,
                          piano.text2pitch('d##') as Pitch,
                          piano.text2pitch('e##') as Pitch,
                          piano.text2pitch('f##') as Pitch,
                          piano.text2pitch('g##') as Pitch,
                          piano.text2pitch('a##') as Pitch,
                          piano.text2pitch('b##') as Pitch,
                          piano.text2pitch('c5b') as Pitch,
                          piano.text2pitch('d5b') as Pitch,
                          piano.text2pitch('e5b') as Pitch,
                          piano.text2pitch('f5b') as Pitch,
                          piano.text2pitch('g5b') as Pitch,
                          piano.text2pitch('a5b') as Pitch,
                          piano.text2pitch('b5b') as Pitch,
                          piano.text2pitch('c6bb') as Pitch,
                          piano.text2pitch('d6bb') as Pitch,
                          piano.text2pitch('e6bb') as Pitch,
                          piano.text2pitch('f6bb') as Pitch,
                          piano.text2pitch('g6bb') as Pitch,
                          piano.text2pitch('a6bb') as Pitch,
                          piano.text2pitch('b6bb') as Pitch,
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          ],
        }}
      />
      <CircleOfFifths />
    </div>
  );
}

const flatMajorScales = [
  piano.pitch({ stepValue: 'C' }),
  piano.pitch({ stepValue: 'F' }),
  piano.pitch({ stepValue: 'B', accidental: 'flat' }),
  piano.pitch({ stepValue: 'E', accidental: 'flat' }),
  piano.pitch({ stepValue: 'A', accidental: 'flat' }),
  piano.pitch({ stepValue: 'D', accidental: 'flat' }),
  piano.pitch({ stepValue: 'G', accidental: 'flat' }),
].map((note) => piano.scale(note, 'major') as Scale);

const flatMinorScales = [
  piano.pitch({ stepValue: 'A' }),
  piano.pitch({ stepValue: 'D' }),
  piano.pitch({ stepValue: 'G' }),
  piano.pitch({ stepValue: 'C' }),
  piano.pitch({ stepValue: 'F' }),
  piano.pitch({ stepValue: 'B', accidental: 'flat' }),
  piano.pitch({ stepValue: 'E', accidental: 'flat' }),
].map((note) => piano.scale(note, 'minor') as Scale);

const sharpMajorScales = [
  piano.pitch({ stepValue: 'B' }),
  piano.pitch({ stepValue: 'E' }),
  piano.pitch({ stepValue: 'A' }),
  piano.pitch({ stepValue: 'D' }),
  piano.pitch({ stepValue: 'G' }),
].map((note) => piano.scale(note, 'major') as Scale);

const sharpMinorScales = [
  piano.pitch({ stepValue: 'G', accidental: 'sharp' }),
  piano.pitch({ stepValue: 'C', accidental: 'sharp' }),
  piano.pitch({ stepValue: 'F', accidental: 'sharp' }),
  piano.pitch({ stepValue: 'B' }),
  piano.pitch({ stepValue: 'E' }),
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
              <Score
                size={10}
                minWidth={220}
                data={{
                  shards: [
                    {
                      measures: [
                        {
                          attributes: {
                            keySignature: { fifths: scale.fifths },
                            showClef: true,
                          },
                          content: {
                            notes: [],
                          },
                        },
                      ],
                    },
                  ],
                }}
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
              <Score
                size={10}
                minWidth={220}
                data={{
                  shards: [
                    {
                      measures: [
                        {
                          attributes: {
                            keySignature: { fifths: scale.fifths },
                            showClef: true,
                          },
                          content: {
                            notes: [],
                          },
                        },
                      ],
                    },
                  ],
                }}
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
              <Score
                size={10}
                minWidth={220}
                data={{
                  shards: [
                    {
                      measures: [
                        {
                          attributes: {
                            keySignature: { fifths: scale.fifths },
                            showClef: true,
                          },
                          content: {
                            notes: [],
                          },
                        },
                      ],
                    },
                  ],
                }}
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
              <Score
                size={10}
                minWidth={220}
                data={{
                  shards: [
                    {
                      measures: [
                        {
                          attributes: {
                            keySignature: { fifths: scale.fifths },
                            showClef: true,
                          },
                          content: {
                            notes: [],
                          },
                        },
                      ],
                    },
                  ],
                }}
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
