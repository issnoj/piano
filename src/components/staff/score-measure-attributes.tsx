import { CLEF_WIDTH } from './consts';
import { GClef } from './icons';
import { ScoreKey } from './score-key';
import { ScoreMeasureAttributesProps } from './types';

export const ScoreMeasureAttributes = ({
  showClef,
  keySignature,
  width,
  height,
}: ScoreMeasureAttributesProps) => {
  return (
    <g data-type={'measure-attributes'} width={width} height={height}>
      {showClef && (
        <g data-type={'clef'} style={{ translate: `20px 10px` }}>
          <GClef />
        </g>
      )}
      {keySignature && (
        <g data-type={'key'}>
          <ScoreKey translateX={CLEF_WIDTH} {...keySignature} />
        </g>
      )}
    </g>
  );
};
