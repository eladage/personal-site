import { useRouter } from 'next/router';

import { Container } from '@/components/Container';
import { Prompt } from '@/components/Prompt';

export function SimpleLayout({ title, titleAction, intro, command, children }) {
  let { pathname } = useRouter();

  return (
    <Container className="mt-12 sm:mt-20">
      <header>
        {command && (
          <Prompt path={`~${pathname}`} className="mb-6">
            {command}
          </Prompt>
        )}
        <div className="flex flex-wrap items-end justify-between gap-4">
          {title && (
            <h1 className="text-3xl font-extrabold tracking-tight text-fg sm:text-5xl">
              <span className="text-accent">#</span> {title}
            </h1>
          )}
          {titleAction && <div>{titleAction}</div>}
        </div>
        {intro && (
          <p className="mt-6 max-w-2xl text-sm leading-7 text-muted">
            <span className="select-none text-faint">&gt; </span>
            {intro}
          </p>
        )}
      </header>
      <div className="mt-12 sm:mt-16">{children}</div>
    </Container>
  );
}
