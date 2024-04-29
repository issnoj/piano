'use client';

import { Score } from '@/components/score/score';
import { piano } from '@/lib/piano';
import { cleanChordText, getAllChordByKey } from '@/lib/piano/chord';
import { Chord } from '@/lib/piano/types';
import { debounce } from '@/lib/utils';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { ScoreData, ShardData } from '../score/types';

const allChords = getAllChordByKey();
const chordTexts = Object.keys(allChords);

type Props = {
  defaultValue: string;
  onChangeChords: (chords: Chord[][]) => void;
  disabled: boolean;
};

export const InputChord = ({
  defaultValue,
  onChangeChords,
  disabled,
  ...props
}: Props) => {
  const [scoreData, setScoreData] = React.useState<ScoreData>(
    chordMatrix2scoreData(input2ChordMatrix(defaultValue)),
  );
  const [suggestChords, setSuggestChords] = React.useState<Chord[]>([]);
  const [showSuggestion, setShowSuggest] = React.useState(true);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = React.useCallback(
    debounce((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const chordMatrix = input2ChordMatrix(e.target.value);
      const scoreData = chordMatrix2scoreData(chordMatrix);
      setScoreData(scoreData);
      onChangeChords(chordMatrix);

      const lastWord = e.target.value.split('\n').at(-1)?.split(' ').at(-1);
      if (lastWord) {
        const suggestedChords = getSuggestChords(lastWord.toLowerCase());
        if (suggestedChords.length > 0) {
          setSuggestChords(suggestedChords);
        } else {
          setSuggestChords([]);
        }
      } else {
        setSuggestChords([]);
      }
    }, 300),
    [],
  );

  return (
    <div>
      <Textarea
        className="w-full border px-3 py-2"
        ref={inputRef}
        defaultValue={defaultValue}
        placeholder="コードを入力してください   例) c f g c"
        onChange={handleChange}
        disabled={disabled}
        {...props}
      />
      <div className="mt-5 flex h-10 flex-wrap items-center gap-1 text-sm">
        {showSuggestion && (
          <>
            {suggestChords.length > 0 && (
              <span className={'whitespace-nowrap text-muted-foreground'}>
                候補：
              </span>
            )}
            {suggestChords.map((chord) => (
              <span className={'font-medium'} key={chord.name}>
                {chord.name.replaceAll('♭', 'b').replaceAll('♯', '#')}
              </span>
            ))}
          </>
        )}
      </div>
      <Score minWidth={185} className={'w-full'} data={scoreData} />
    </div>
  );
};

export function input2scoreData(input: string) {
  return chordMatrix2scoreData(input2ChordMatrix(input));
}

function input2ChordMatrix(input: string): Chord[][] {
  const chordMatrix: Chord[][] = [];
  input.split('\n').forEach((value) => {
    const text = cleanChordText(value);
    if (text) {
      const chords = piano.text2Chords(text);
      if (chords.length > 0) {
        chordMatrix.push(chords);
      }
    }
  });
  return chordMatrix;
}

function chordMatrix2scoreData(chordMatrix: Chord[][]): ScoreData {
  const shards: ShardData[] = [];
  chordMatrix.forEach((chords) => {
    const measure: ShardData['measures'][number] = {
      attributes: {
        keySignature: { fifths: 0 },
        showClef: true,
      },
      content: {
        notes: [],
      },
    };
    chords.forEach((chord) => {
      measure.content.notes.push({
        name: chord.name,
        pitches: chord.pitches,
      });
    });
    shards.push({ measures: [measure] });
  });
  return {
    shards,
  };
}

function getSuggestChords(text: string) {
  const suggestChords: Chord[] = [];
  for (const key of chordTexts) {
    // 前方一致しなければスキップ
    if (!key.startsWith(text)) {
      continue;
    }

    const chord = allChords[key];
    const rest = text.slice(1);

    // 転回系は、/ が含まれていなければスキップ
    if (chord.inversion && !text.split('').includes('/')) {
      continue;
    }

    // ダブル臨時記号は、該当記号が未入力ならスキップ
    if (
      chord.accidental &&
      ['dflat', 'dsharp'].includes(chord.accidental) &&
      !/[#b]{2,}/.test(rest)
    ) {
      continue;
    }

    // 臨時記号は、該当記号が未入力ならスキップ
    if (chord.accidental && !/[#b]/.test(rest)) {
      continue;
    }

    suggestChords.push(chord);
  }

  return suggestChords;
}
