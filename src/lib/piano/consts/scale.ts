import { ScaleType, ScaleTypeId } from '../types';

export const scaleTypes: Record<ScaleTypeId, ScaleType> = {
  // 長音階
  major: {
    id: 'major',
    shortName: '長調',
    name: '長音階',
    nameEn: 'Major',
    nameDe: 'Dur',
    intervals: [2, 2, 1, 2, 2, 2, 1],
  },
  // 自然短音階
  minor: {
    id: 'minor',
    shortName: '短調',
    name: '自然短音階',
    nameEn: 'Minor',
    nameDe: 'Moll',
    intervals: [2, 1, 2, 2, 1, 2, 2],
  },
  // 和声短音階
  harmonicMinor: {
    id: 'harmonicMinor',
    shortName: '短調',
    name: '和声短音階',
    nameEn: 'Harmonic Minor',
    nameDe: 'Harmonic Moll',
    intervals: [2, 1, 2, 2, 1, 3, 1],
  },
  // 旋律短音階
  melodicMinor: {
    id: 'melodicMinor',
    shortName: '短調',
    name: '旋律短音階',
    nameEn: 'Melodic Minor',
    nameDe: 'Melodic Moll',
    intervals: [2, 1, 2, 2, 2, 2, 1],
  },
};
