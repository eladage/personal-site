import { useId } from 'react';

export function Section({ title, subtitle, children }) {
  let id = useId();

  return (
    <section aria-labelledby={id}>
      <div className="grid grid-cols-1 items-baseline gap-y-4 md:grid-cols-4 md:gap-x-8">
        <div className="md:sticky md:top-24">
          <h2 id={id} className="text-sm font-bold text-fg">
            <span className="text-accent">##</span> {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-xs text-faint">
              <span className="select-none">{'// '}</span>
              {subtitle}
            </p>
          )}
        </div>
        <div className="md:col-span-3">{children}</div>
      </div>
    </section>
  );
}
