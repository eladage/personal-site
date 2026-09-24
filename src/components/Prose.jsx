import clsx from 'clsx';

export function Prose({ children, className }) {
  return <div className={clsx(className, 'prose max-w-none')}>{children}</div>;
}
