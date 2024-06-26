import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

function ChevronRightIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Card({ as: Component = 'div', className, children }) {
  return (
    <Component
      className={clsx(className, 'group relative flex flex-col items-start')}
    >
      {children}
    </Component>
  );
}

Card.Link = function CardLink({ children, ...props }) {
  return (
    <>
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
      <Link {...props}>
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  );
};

Card.Title = function CardTitle({
  as: Component = 'h2',
  secondary,
  image,
  href,
  children,
}) {
  return (
    <Component className="flex w-full justify-between text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
      {href ? (
        <Card.Link href={href}>{children}</Card.Link>
      ) : (
        <>
          <div className="flex items-center gap-2">
            {children}
            {image && (
              <Image src={image} alt="" className="h-7 w-7" unoptimized />
            )}
          </div>
          {secondary && (
            <span className="text-sm italic text-zinc-500 dark:text-zinc-400">
              {secondary}
            </span>
          )}
        </>
      )}
    </Component>
  );
};

Card.Description = function CardDescription({ as: Component = 'p', children }) {
  return (
    <Component className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400 sm:list-disc">
      {children}
    </Component>
  );
};

Card.Cta = function CardCta({ children }) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-sky-600 dark:text-pink-500"
    >
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
    </div>
  );
};

Card.Subtitle = function CardSubtitle({ children }) {
  return (
    <span className="relative z-10 mt-1 text-sm text-zinc-500 dark:text-pink-500">
      {children}
    </span>
  );
};

Card.Info = function CardInfo({ children }) {
  return (
    <p className="relative z-10 mt-1 text-sm text-zinc-500 dark:text-zinc-400">
      {children}
    </p>
  );
};

Card.Eyebrow = function CardEyebrow({
  as: Component = 'p',
  decorate = false,
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={clsx(
        className,
        'relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500',
        decorate && 'pl-3.5'
      )}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}
      {children}
    </Component>
  );
};
