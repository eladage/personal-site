import clsx from 'clsx';

// A bordered box with its title sitting on the top edge, like a TUI window.
export function Panel({
  as: Component = 'section',
  title,
  action,
  className,
  bodyClassName,
  children,
  ...props
}) {
  return (
    <Component
      className={clsx('relative border border-line bg-bg/80', className)}
      {...props}
    >
      {(title || action) && (
        <div className="absolute -top-3 left-3 right-3 flex items-center justify-between gap-3 text-xs leading-6">
          {title && (
            <h2 className="bg-bg px-2 font-bold text-fg">
              <span className="text-faint">[ </span>
              {title}
              <span className="text-faint"> ]</span>
            </h2>
          )}
          {action && <div className="bg-bg px-2">{action}</div>}
        </div>
      )}
      <div className={clsx('p-5 pt-7 sm:p-6 sm:pt-8', bodyClassName)}>
        {children}
      </div>
    </Component>
  );
}
