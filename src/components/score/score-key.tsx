import { FlatIcon, SharpIcon } from './icons';

const flat = {
  y: [13.5, -19, 20.5, -6.5, 33.5, 0.5, 40.5],
  icon: FlatIcon,
};

const sharp = {
  y: [-18.5, 10.5, -28.5, 1.5, 31.5, -7.5, 21.5],
  icon: SharpIcon,
};

export const ScoreKey = ({
  translateX,
  fifths,
}: {
  translateX: number;
  fifths: number;
}) => {
  const count = Math.abs(fifths);
  const Key = fifths < 0 ? flat : sharp;

  return (
    <g data-type="key">
      {[...Array(count)].map((_, i) => (
        <Key.icon
          key={i}
          style={{
            translate: `${translateX + i * 13}px ${Key.y[i]}px`,
          }}
        />
      ))}
    </g>
  );
};
