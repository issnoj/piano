import { ScoreKey } from './score-key';
import { ScoreMeasureAttributesProps } from './types';

export const ScoreMeasureAttributes = ({
  boundingBox,
  clef,
  keySignature,
  clefTranslateX,
  clefTranslateY,
}: ScoreMeasureAttributesProps) => {
  return (
    <g
      data-type={'measure-attributes'}
      width={boundingBox.width}
      height={boundingBox.height}
    >
      {clef && (
        <g
          data-type={'clef'}
          style={{ translate: `${clefTranslateX}px ${clefTranslateY}px` }}
        >
          {clef}
        </g>
      )}
      {keySignature && <ScoreKey {...keySignature} />}
    </g>
  );
};
