import clsx from 'clsx';

// A divider made of repeated characters, clipped to whatever width it gets.
export function AsciiRule({ pattern = '─', label, className }) {
  let fill = pattern.repeat(Math.ceil(400 / pattern.length));

  return (
    <div
      aria-hidden="true"
      className={clsx(
        'flex select-none items-center gap-3 overflow-hidden whitespace-nowrap text-xs text-faint',
        className,
      )}
    >
      {label && <span className="flex-none text-muted">{label}</span>}
      <span className="ascii overflow-hidden">{fill}</span>
    </div>
  );
}
