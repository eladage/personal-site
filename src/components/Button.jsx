import Link from 'next/link';
import clsx from 'clsx';

const variantStyles = {
  primary:
    'border-accent bg-accent font-bold text-bg hover:bg-transparent hover:text-accent',
  secondary:
    'border-line bg-panel/60 font-medium text-fg hover:border-accent hover:text-accent',
};

export function Button({ variant = 'primary', className, href, ...props }) {
  className = clsx(
    'group inline-flex items-center justify-center gap-2 border px-3 py-2 text-sm transition-colors active:translate-y-px',
    variantStyles[variant],
    className,
  );

  return href ? (
    <Link href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  );
}
