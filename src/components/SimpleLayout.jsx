import { Container } from '@/components/Container';

export function SimpleLayout({ title, titleAction, intro, children }) {
  return (
    <Container className="mt-16 sm:mt-32">
      <header>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {title}
          </h1>
          {titleAction && <div>{titleAction}</div>}
        </div>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          {intro}
        </p>
      </header>
      <div className="mt-16 sm:mt-20">{children}</div>
    </Container>
  );
}
