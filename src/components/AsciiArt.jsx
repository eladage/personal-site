import clsx from 'clsx';

// Renders figlet "ANSI Shadow" art in two tones: solid blocks in the accent
// color, the box-drawing drop shadow faint.
export function AsciiArt({ art, label, className, style }) {
  let lines = art.split('\n');
  let width = Math.max(...lines.map((line) => line.length));

  return (
    <pre
      role="img"
      aria-label={label}
      className={clsx('ascii select-none', className)}
      style={{ '--ascii-cols': width, ...style }}
    >
      {lines.map((line, i) => (
        <span key={i}>
          {line.split(/(█+)/).map((run, j) =>
            run.startsWith('█') ? (
              <span key={j} className="text-accent">
                {run}
              </span>
            ) : (
              <span key={j} className="text-faint">
                {run}
              </span>
            ),
          )}
          {i < lines.length - 1 && '\n'}
        </span>
      ))}
    </pre>
  );
}
