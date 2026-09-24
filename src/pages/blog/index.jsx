import Head from 'next/head';
import Link from 'next/link';

import { SimpleLayout } from '@/components/SimpleLayout';
import { getAllPosts } from '@/lib/getAllPosts';

function Post({ post }) {
  return (
    <li>
      <Link
        href={`/blog/${post.slug}`}
        className="group grid grid-cols-1 gap-x-8 gap-y-1 border-b border-dashed border-line py-6 md:grid-cols-[9rem_1fr]"
      >
        <p className="text-xs leading-6">
          <span className="hidden text-faint md:block">-rw-r--r--</span>
          <time dateTime={post.date} className="text-warn">
            {post.date}
          </time>
        </p>
        <div>
          <p className="text-xs text-faint group-hover:text-accent">
            {post.slug}.mdx
          </p>
          <h2 className="mt-1 text-base font-bold text-fg group-hover:text-accent">
            {post.title}
          </h2>
          <p className="mt-2 text-sm leading-7 text-muted">
            {post.description}
          </p>
          <p
            aria-hidden="true"
            className="mt-3 text-xs text-accent opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            $ cat {post.slug}.mdx →
          </p>
        </div>
      </Link>
    </li>
  );
}

export default function BlogIndex({ posts }) {
  return (
    <>
      <Head>
        <title>Blog - Eric Ladage</title>
        <meta name="description" content="Blog " />
      </Head>
      <SimpleLayout command="ls -lt" title="blog">
        <p className="text-xs text-faint">total {posts.length}</p>
        <ul className="max-w-3xl border-t border-dashed border-line">
          {posts.map((post) => (
            <Post key={post.slug} post={post} />
          ))}
        </ul>
      </SimpleLayout>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      posts: (await getAllPosts()).map(({ component, ...meta }) => meta),
    },
  };
}
