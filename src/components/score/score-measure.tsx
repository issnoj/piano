import { ScoreMeasureAttributes } from '@/components/score/score-measure-attributes';
import { ScoreMeasureProps } from '@/components/score/types';
import { ScoreMeasureContent } from './score-measure-content';

export const ScoreMeasure = ({
  boundingBox,
  attributesProps,
  contentProps,
}: ScoreMeasureProps) => {
  return (
    <g
      data-type={'measure'}
      data-width={boundingBox.width}
      data-height={boundingBox.height}
    >
      <ScoreMeasureAttributes {...attributesProps} />
      <ScoreMeasureContent {...contentProps} />
      <g style={{ translate: `0 ${-boundingBox.top}px` }}>
        <rect
          width={boundingBox.width + boundingBox.left}
          height={boundingBox.height + boundingBox.top}
          stroke={'rgba(0,255,0,0.5)'}
          strokeWidth={0}
        />
      </g>
    </g>
  );
};
