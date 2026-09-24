import clsx from 'clsx';

// A shell prompt line: `~/path $ command`
export function Prompt({ path = '~', children, className }) {
  return (
    <p className={clsx('text-sm', className)}>
      <span className="text-ok">{path}</span>{' '}
      <span className="select-none text-accent">$</span>{' '}
      <span className="text-fg">{children}</span>
    </p>
  );
}
