import { FlatIcon, SharpIcon } from './icons';

export const ScoreKey = ({
  translateX,
  fifths,
}: {
  translateX: number;
  fifths: number;
}) => {
  const count = Math.abs(fifths);
  const flats = [53, 20.5, 60, 33, 73, 40, 80];
  const sharps = [21, 50, 11, 41, 71, 32, 61];

  if (fifths < 0) {
    return (
      <g>
        {[...Array(count)].map((_, i) => (
          <FlatIcon
            key={i}
            style={{
              transform: `translate(${translateX + i * 13}px, ${flats[i]}px)`,
            }}
          />
        ))}
      </g>
    );
  }

  return (
    <g>
      {[...Array(count)].map((_, i) => (
        <SharpIcon
          key={i}
          style={{
            transform: `translate(${translateX + i * 16}px, ${sharps[i]}px)`,
          }}
        />
      ))}
    </g>
  );
};
