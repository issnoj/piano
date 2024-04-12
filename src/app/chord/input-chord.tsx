'use client';

import { Staff } from '@/components/staff/staff';
import { piano } from '@/lib/piano';
import { cleanChordText, getAllChordByKey } from '@/lib/piano/chord';
import { Chord } from '@/lib/piano/types';
import { debounce } from '@/lib/utils';
import React from 'react';

const allChords = getAllChordByKey();
const chordTexts = Object.keys(allChords);

function getSuggestChords(text: string) {
  const suggestChords: Chord[] = [];
  for (const key of chordTexts) {
    // 前方一致しなければスキップ
    if (!key.startsWith(text)) {
      continue;
    }

    const chord = allChords[key];
    const lastChar = text.slice(-1);
    const rest = text.slice(1);

    // 転回系は、末尾が / でなければスキップ
    if (chord.inversion && lastChar !== '/') {
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

export const InputChord = () => {
  const [chords, setChords] = React.useState<Chord[]>([]);
  const [suggestChords, setSuggestChords] = React.useState<Chord[]>([]);
  const [showSuggestion, setShowSuggest] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = React.useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const value = cleanChordText(e.target.value);
      const chords = piano.text2Chords(value);
      setChords(chords);

      const array = value.split(' ');
      const lastText = array[array.length - 1];
      if (lastText) {
        setSuggestChords(getSuggestChords(lastText));
      } else {
        setSuggestChords([]);
      }
    }, 300),
    [],
  );

  return (
    <div>
      <input
        className="w-full border px-3 py-2"
        ref={inputRef}
        type="text"
        onChange={handleChange}
        onFocus={() => setShowSuggest(true)}
        onBlur={() => setShowSuggest(false)}
      />
      <div className="flex h-10 items-center gap-1">
        {showSuggestion && (
          <>
            {suggestChords.map((chord) => (
              <div key={chord.name}>
                {chord.name.replaceAll('♭', 'b').replaceAll('♯', '#')}
              </div>
            ))}
          </>
        )}
      </div>
      <Staff chords={chords} />
    </div>
  );
};
