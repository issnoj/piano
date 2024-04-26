import { ScoreMeasureAttributes } from '@/components/staff/score-measure-attributes';
import { ScoreMeasureProps } from '@/components/staff/types';
import { ScoreNoteList } from '@/components/staff/score-note-list';

export const ScoreMeasure = ({
  width,
  height,
  attributesProps,
  noteListPropsList,
}: ScoreMeasureProps) => {
  return (
    <g data-type={'measure'} data-width={width} data-height={height}>
      <ScoreMeasureAttributes {...attributesProps} />
      {noteListPropsList.map((props, i) => (
        <ScoreNoteList height={height} key={i} {...props} />
      ))}
    </g>
  );
};
