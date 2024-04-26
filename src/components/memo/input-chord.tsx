import { Score } from '@/components/staff/score';
import { piano } from '@/lib/piano';
import { cleanChordText, getAllChordByKey } from '@/lib/piano/chord';
import { Chord } from '@/lib/piano/types';
import { debounce } from '@/lib/utils';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

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

type Props = {
  initialChords: Chord[];
  onChangeChords: (chords: Chord[]) => void;
  disabled: boolean;
};

export const InputChord = ({
  initialChords,
  onChangeChords,
  disabled,
  ...props
}: Props) => {
  const [chords, setChords] = React.useState<Chord[]>(initialChords);
  const [suggestChords, setSuggestChords] = React.useState<Chord[]>([]);
  const [showSuggestion, setShowSuggest] = React.useState(false);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = React.useCallback(
    debounce((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = cleanChordText(e.target.value);
      const chords = piano.text2Chords(value);
      setChords(chords);
      onChangeChords(chords);

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
      <Textarea
        className="w-full border px-3 py-2"
        ref={inputRef}
        defaultValue={
          initialChords.length > 0
            ? initialChords.map((v) => v.name).join(' ')
            : ''
        }
        placeholder="コードを入力してください   例) c f g c"
        onChange={handleChange}
        onFocus={() => setShowSuggest(true)}
        onBlur={() => setShowSuggest(false)}
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
      <Score minWidth={185} className={'w-full'} chords={chords} />
    </div>
  );
};
