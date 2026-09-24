import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Container } from '@/components/Container';
import { Prose } from '@/components/Prose';
import { AsciiRule } from '@/components/AsciiRule';

export function ArticleLayout({
  children,
  meta,
  isRssFeed = false,
  previousPathname,
}) {
  let router = useRouter();

  if (isRssFeed) {
    return children;
  }

  let backClassName =
    'text-xs text-muted transition-colors hover:text-accent';

  return (
    <>
      <Head>
        <title>{`${meta.title} - Eric Ladage`}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <Container className="mt-12 lg:mt-20">
        <div className="mx-auto max-w-2xl">
          {previousPathname ? (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back to articles"
              className={backClassName}
            >
              &larr; cd ..
            </button>
          ) : (
            <Link href="/articles" className={backClassName}>
              &larr; cd ../articles
            </Link>
          )}
          <article className="mt-8">
            <header className="flex flex-col">
              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">
                {meta.title}
              </h1>
              <dl className="order-first flex flex-wrap gap-x-4 text-xs text-faint">
                <div>
                  <dt className="inline">date: </dt>
                  <dd className="inline text-warn">
                    <time dateTime={meta.date}>{meta.date}</time>
                  </dd>
                </div>
                {meta.author && (
                  <div>
                    <dt className="inline">author: </dt>
                    <dd className="inline text-muted">{meta.author}</dd>
                  </div>
                )}
              </dl>
              <AsciiRule pattern="═" className="mt-6" />
            </header>
            <Prose className="mt-8">{children}</Prose>
            <AsciiRule pattern="═" label="EOF" className="mt-16" />
          </article>
        </div>
      </Container>
    </>
  );
}
