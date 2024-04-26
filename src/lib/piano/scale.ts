import { scaleTypes } from './consts';
import { Pitch, getBasePitchByNumber, pitch } from './pitch';
import { Accidental, Scale, ScaleTypeId } from './types';

export function scale(pianoNote: Pitch, type: ScaleTypeId): Scale | null {
  if (notExistScale(pianoNote, type)) {
    return null;
  }

  const pianoNotes: Pitch[] = [pianoNote];
  const scaleType = scaleTypes[type];
  let sumInterval = 0;
  let fifths = 0;

  if (type === 'harmonicMinor' || type === 'melodicMinor') {
    const minorScale = scale(pianoNote, 'minor');
    if (minorScale) {
      fifths = minorScale.fifths;
    }
  }

  scaleType.intervals.forEach((interval, index) => {
    const _nextNumber = pianoNote.step.number + index + 1;
    const nextNumber = _nextNumber % 7;
    const nextBaseNote = getBasePitchByNumber(nextNumber);
    const nextOctave = pianoNote.octave + Math.floor(_nextNumber / 7);

    sumInterval += interval;
    const nextInteger = pianoNote.integer + sumInterval;

    const nextNote = pitch({
      stepValue: nextBaseNote.value,
      octave: nextOctave,
      integer: nextInteger,
    });

    if (type !== 'harmonicMinor' && type !== 'melodicMinor') {
      fifths += calcFifths(nextNote.accidental);
    }

    pianoNotes.push(nextNote);
  });

  let namePrefix = '';
  if (pianoNote.accidental === 'sharp') {
    namePrefix = '嬰';
  } else if (pianoNote.accidental === 'flat') {
    namePrefix = '変';
  }
  const shortName = `${namePrefix}${pianoNote.step.name.iroha}${scaleType.shortName}`;
  const name = `${namePrefix}${pianoNote.step.name.iroha}${scaleType.name}`;
  const nameEn = `${pianoNote.getName('en')} ${scaleType.nameEn}`;
  const nameDe = `${pianoNote.getName('de')} ${scaleType.nameDe}`;

  return {
    shortName,
    name,
    nameEn,
    nameDe,
    type: scaleType,
    notes: pianoNotes,
    fifths,
  };
}

type NotExistScale = {
  description: string;
};

function calcFifths(accidental: Accidental) {
  if (accidental === 'flat') {
    return -1;
  }
  if (accidental === 'sharp') {
    return 1;
  }
  return 0;
}

function notExistScale(
  pianoNote: Pitch,
  type: ScaleTypeId,
): NotExistScale | null {
  const checkValue = `${pianoNote.step.value}${pianoNote.accidental ?? ''}.${type}`;

  const notExistScales: Record<string, NotExistScale> = {
    // 長調
    'Bsharp.major': { description: 'ハ長調と同じ' },
    'Dsharp.major': { description: '変ホ長調と同じ' },
    'Fflat.major': { description: 'ホ長調と同じ' },
    'Esharp.major': { description: 'ヘ長調と同じ' },
    'Gsharp.major': { description: '変イ長調と同じ' },
    'Asharp.major': { description: '変ロ長調と同じ' },
    // 短調
    'Cflat.minor': { description: 'ロ短調と同じ' },
    'Cflat.harmonicMinor': { description: 'ロ短調と同じ' },
    'Cflat.melodicMinor': { description: 'ロ短調と同じ' },
    'Bsharp.minor': { description: 'ハ短調と同じ' },
    'Bsharp.harmonicMinor': { description: 'ハ短調と同じ' },
    'Bsharp.melodicMinor': { description: 'ハ短調と同じ' },
    'Dflat.minor': { description: '嬰ハ短調と同じ' },
    'Dflat.harmonicMinor': { description: '嬰ハ短調と同じ' },
    'Dflat.melodicMinor': { description: '嬰ハ短調と同じ' },
    'Fflat.minor': { description: 'ホ短調と同じ' },
    'Fflat.harmonicMinor': { description: 'ホ短調と同じ' },
    'Fflat.melodicMinor': { description: 'ホ短調と同じ' },
    'Esharp.minor': { description: 'ヘ短調と同じ' },
    'Esharp.harmonicMinor': { description: 'ヘ短調と同じ' },
    'Esharp.melodicMinor': { description: 'ヘ短調と同じ' },
    'Gflat.minor': { description: '嬰ヘ短調と同じ' },
    'Gflat.harmonicMinor': { description: '嬰ヘ短調と同じ' },
    'Gflat.melodicMinor': { description: '嬰ヘ短調と同じ' },
  };

  return notExistScales[checkValue];
}
