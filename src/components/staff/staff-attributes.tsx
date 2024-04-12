import { CLEF_WIDTH } from './consts';
import { GClef } from './icons';
import { KeySignature } from './staff-key-signature';
import { StaffAttributesProps } from './types';

export const StaffAttributes = ({
  showClef,
  keySignature,
  width,
  height,
}: StaffAttributesProps) => {
  return (
    <g>
      {showClef && <GClef />}
      {keySignature && (
        <KeySignature translateX={CLEF_WIDTH} {...keySignature} />
      )}
      <rect width={width} height={height} fill={'blue'} fillOpacity={0} />
    </g>
  );
};
