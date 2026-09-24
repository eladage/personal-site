import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { AsciiArt } from '@/components/AsciiArt';
import { AsciiField } from '@/components/AsciiField';
import { AsciiRule } from '@/components/AsciiRule';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { Lightbox } from '@/components/Lightbox';
import { Panel } from '@/components/Panel';
import { Prompt } from '@/components/Prompt';
import ConfettiWrapper from '@/components/ConfettiWrapper';
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  EmailIcon,
} from '@/components/SocialIcons';

import { NAME_STACKED, NAME_WIDE } from '@/constants/ASCII';
import { generateRssFeed } from '@/lib/generateRssFeed';
import { getAllPosts } from '@/lib/getAllPosts';
import RESUME from '@/constants/RESUME';

const SOCIALS = [
  { label: 'email', href: 'mailto:eladage@gmail.com', icon: EmailIcon },
  { label: 'github', href: 'https://github.com/eladage', icon: GitHubIcon },
  {
    label: 'linkedin',
    href: 'https://www.linkedin.com/in/eric-ladage/',
    icon: LinkedInIcon,
  },
  {
    label: 'instagram',
    href: 'https://instagram.com/eladage',
    icon: InstagramIcon,
  },
];

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <AsciiField className="absolute inset-0 text-faint/60 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
      <Container className="relative pb-16 pt-12 sm:pb-24 sm:pt-20">
        <Prompt>whoami</Prompt>
        <h1 className="mt-6">
          <AsciiArt
            art={NAME_WIDE}
            label="Eric Ladage"
            scramble
            className="hidden sm:block"
            style={{
              fontSize:
                'min(18px, calc((100vw - 8.5rem) / (var(--ascii-cols) * 0.6)))',
            }}
          />
          <AsciiArt
            art={NAME_STACKED}
            label="Eric Ladage"
            scramble
            className="sm:hidden"
            style={{
              fontSize: 'calc((100vw - 2.5rem) / (var(--ascii-cols) * 0.6))',
            }}
          />
        </h1>
        <p className="mt-6 text-sm font-bold text-fg">
          software engineer<span className="text-faint">{' // '}</span>
          <span className="text-ok">
            {RESUME[0].title.toLowerCase()} @ {RESUME[0].company.toLowerCase()}
          </span>
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <Link
                href={href}
                className="group flex items-center gap-2 border border-line bg-bg/80 px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="h-4 w-4 fill-current" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Likes() {
  let likes = [
    { title: 'dev', link: '/work' },
    { title: 'music', link: '' },
    { title: 'photos', link: '' },
    { title: 'bikes', link: '' },
    { title: 'art', link: '' },
    { title: 'climbing', link: '' },
  ];

  return (
    <section className="mt-16">
      <ConfettiWrapper className="w-fit cursor-pointer select-none">
        <Prompt>ls ~/interests</Prompt>
      </ConfettiWrapper>
      <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-3 md:grid-cols-6">
        {likes.map((like) => (
          <li key={like.title}>
            {like.link ? (
              <Link
                href={like.link}
                className="font-bold text-accent underline decoration-dashed underline-offset-4 hover:bg-accent hover:text-bg hover:no-underline"
              >
                {like.title}/
              </Link>
            ) : (
              <span className="font-bold text-fg">{like.title}/</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

// Every image in src/images/photos, in filename order. webpack bundles each
// one at build time like a static import, so next/image still gets its
// dimensions and blur placeholder. Add or remove files; no code changes needed.
const photoContext = require.context(
  '../images/photos',
  false,
  /\.(jpe?g|png|webp|avif)$/i
);
const PHOTOS = photoContext
  .keys()
  // webpack also lists each file under its baseUrl path; keep one of each
  .filter((key) => key.startsWith('./'))
  .sort()
  .map((key) => ({
    image: photoContext(key).default,
    name: key.replace('./', ''),
  }));

function Photos() {
  let [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="mt-16">
      <Container>
        <Prompt>ls ~/photos</Prompt>
      </Container>
      <div className="hide-scrollbar mt-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:px-8">
        {PHOTOS.map(({ image, name }, imageIndex) => (
          <figure
            key={image.src}
            // auto margins center the row when it fits, unlike justify-center,
            // which pushes the first photos out of scroll reach when it doesn't
            className="flex-none snap-start first:ml-auto last:mr-auto"
          >
            <button
              type="button"
              aria-label={`Open ${name}`}
              onClick={() => setOpenIndex(imageIndex)}
              className="crt block aspect-[9/10] w-44 cursor-zoom-in sm:w-60"
            >
              <Image
                src={image}
                alt=""
                sizes="(min-width: 640px) 15rem, 11rem"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </button>
            <figcaption className="mt-2 text-xs text-faint">{name}</figcaption>
          </figure>
        ))}
      </div>
      <Lightbox
        photos={PHOTOS}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </section>
  );
}

function Posts({ posts }) {
  return (
    <Panel
      title="~/blog"
      action={
        <Link href="/blog" className="text-muted hover:text-accent">
          more →
        </Link>
      }
    >
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <p className="flex flex-wrap gap-x-3 text-xs">
                <time dateTime={post.date} className="text-warn">
                  {post.date}
                </time>
                <span className="text-faint group-hover:text-accent">
                  {post.slug}.mdx
                </span>
              </p>
              <h3 className="mt-1 text-sm font-bold text-fg group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-1 text-xs leading-6 text-muted">
                {post.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function Resume() {
  return (
    <Panel
      title="~/work"
      action={
        <Link href="/work" className="text-muted hover:text-accent">
          more →
        </Link>
      }
    >
      <ol>
        {RESUME.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-3">
            <div
              aria-hidden="true"
              className="flex w-3 flex-none flex-col items-center"
            >
              <span
                className={clsx(
                  'leading-6',
                  role.current ? 'text-accent' : 'text-muted',
                )}
              >
                *
              </span>
              {roleIndex < RESUME.length - 1 && (
                <span className="w-px flex-auto border-l border-dashed border-line" />
              )}
            </div>
            <dl className="flex min-w-0 flex-auto flex-wrap gap-x-2 pb-5 text-xs leading-6">
              <dt className="sr-only">Company</dt>
              <dd className="font-bold text-fg">
                {role.company}
                {role.current && (
                  <span className="ml-2 font-normal text-ok">
                    (HEAD -&gt; now)
                  </span>
                )}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-warn"
                aria-label={`${role.start.getUTCFullYear()} until ${
                  role.current ? 'present' : role.end.getUTCFullYear()
                }`}
              >
                <time dateTime={role.start.toISOString()}>
                  {role.start.getUTCFullYear()}
                </time>
                <span className="text-faint">..</span>
                {role.current ? (
                  'now'
                ) : (
                  <time dateTime={role.end.toISOString()}>
                    {role.end.getUTCFullYear()}
                  </time>
                )}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="w-full text-muted">{role.title}</dd>
            </dl>
          </li>
        ))}
      </ol>
      <Button href="/Resume.pdf" variant="secondary" className="mt-2 w-full">
        <span className="text-faint">$</span> curl -O Resume.pdf
        <span aria-hidden="true" className="text-accent">
          ↓
        </span>
      </Button>
    </Panel>
  );
}

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Eric Ladage - Software Engineer</title>
        <meta
          name="description"
          content="Eric Ladage is a software engineer and tech lead at Synchrony, building frontends with React and TypeScript."
        />
      </Head>

      <Hero />
      <Container>
        <Likes />
      </Container>
      <Photos />
      <Container className="mt-16">
        <AsciiRule pattern="·:" className="mb-12" />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Posts posts={posts} />
          <Resume />
        </div>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed();
  }

  return {
    props: {
      posts: (await getAllPosts())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
    },
  };
}
