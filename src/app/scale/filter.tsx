import React from 'react';
import { cn } from '@/lib/utils';
import { steps, scaleTypes } from '@/lib/piano/consts';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { FilterState } from './search/content';

type Props = {
  initialState: FilterState;
  onChangeScaleTypes: (value: FilterState['scaleTypes']) => void;
  onChangeNotes: (value: FilterState['baseNoteIds']) => void;
  onChangeAccidental: (value: FilterState['accidentals']) => void;
};

export const Filter = ({
  initialState,
  onChangeScaleTypes,
  onChangeNotes,
  onChangeAccidental,
}: Props) => {
  const handleChangeScaleType = React.useCallback(
    (value: FilterState['scaleTypes']) => {
      onChangeScaleTypes(value);
    },
    [onChangeScaleTypes],
  );

  const handleChangeNote = React.useCallback(
    (value: FilterState['baseNoteIds'][0] | '') => {
      onChangeNotes(value ? [value] : []);
    },
    [onChangeNotes],
  );

  const handleChangeAccidental = React.useCallback(
    (value: FilterState['accidentals']) => {
      onChangeAccidental(value);
    },
    [onChangeAccidental],
  );

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex space-x-4 lg:border-r lg:pr-4">
        <ToggleGroup
          className="border-r pr-4"
          variant="outline"
          type="multiple"
          onValueChange={handleChangeAccidental}
          size="sm"
          defaultValue={initialState.accidentals}
        >
          <StyledToggleGroupItem value={''} aria-label={`Toggle 幹`}>
            幹
          </StyledToggleGroupItem>
          <StyledToggleGroupItem value={'flat'} aria-label={`Toggle 変`}>
            変
          </StyledToggleGroupItem>
          <StyledToggleGroupItem value={'sharp'} aria-label={`Toggle 嬰`}>
            嬰
          </StyledToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup
          variant="outline"
          type="single"
          onValueChange={handleChangeNote}
          size="sm"
          defaultValue={initialState.baseNoteIds[0]}
        >
          {Object.values(steps).map((v) => (
            <StyledToggleGroupItem
              key={v.value}
              value={v.value}
              aria-label={`Toggle ${v.name}`}
            >
              {v.name.iroha}
            </StyledToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <ToggleGroup
        variant="outline"
        type="multiple"
        onValueChange={handleChangeScaleType}
        size="sm"
        defaultValue={initialState.scaleTypes}
      >
        {Object.values(scaleTypes).map((v) => (
          <StyledToggleGroupItem
            key={v.id}
            value={v.id}
            aria-label={`Toggle ${v.name}`}
          >
            {v.name}
          </StyledToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

const StyledToggleGroupItem = (
  props: Parameters<typeof ToggleGroupItem>[0],
) => (
  <ToggleGroupItem
    className={cn(
      'text-primary/60',
      'data-[state=on]:border data-[state=on]:border-blue-500 data-[state=on]:bg-blue-50 data-[state=on]:text-primary',
    )}
    {...props}
  />
);
