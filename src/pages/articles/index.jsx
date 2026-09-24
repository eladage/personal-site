import Head from 'next/head';
import Link from 'next/link';

import { SimpleLayout } from '@/components/SimpleLayout';
import { getAllArticles } from '@/lib/getAllArticles';

function Article({ article }) {
  return (
    <li>
      <Link
        href={`/articles/${article.slug}`}
        className="group grid grid-cols-1 gap-x-8 gap-y-1 border-b border-dashed border-line py-6 md:grid-cols-[9rem_1fr]"
      >
        <p className="text-xs leading-6">
          <span className="hidden text-faint md:block">-rw-r--r--</span>
          <time dateTime={article.date} className="text-warn">
            {article.date}
          </time>
        </p>
        <div>
          <p className="text-xs text-faint group-hover:text-accent">
            {article.slug}.mdx
          </p>
          <h2 className="mt-1 text-base font-bold text-fg group-hover:text-accent">
            {article.title}
          </h2>
          <p className="mt-2 text-sm leading-7 text-muted">
            {article.description}
          </p>
          <p
            aria-hidden="true"
            className="mt-3 text-xs text-accent opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            $ cat {article.slug}.mdx →
          </p>
        </div>
      </Link>
    </li>
  );
}

export default function ArticlesIndex({ articles }) {
  return (
    <>
      <Head>
        <title>Blog - Eric Ladage</title>
        <meta name="description" content="Blog " />
      </Head>
      <SimpleLayout command="ls -lt" title="articles">
        <p className="text-xs text-faint">total {articles.length}</p>
        <ul className="max-w-3xl border-t border-dashed border-line">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </ul>
      </SimpleLayout>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      articles: (await getAllArticles()).map(({ component, ...meta }) => meta),
    },
  };
}
