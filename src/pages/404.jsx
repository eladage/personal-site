import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { AsciiArt } from '@/components/AsciiArt';
import { Container } from '@/components/Container';
import { Prompt } from '@/components/Prompt';
import { BLUEBERRY, NOT_FOUND } from '@/constants/ASCII';

export default function PageNotFound() {
  // read after mount: the 404 page is prerendered, so the router can't know the path
  let [asPath, setAsPath] = useState('');
  useEffect(() => setAsPath(window.location.pathname), []);

  return (
    <Container className="mt-12 sm:mt-24">
      <div className="flex flex-col-reverse items-center gap-12 md:flex-row md:justify-between">
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-none"
        >
          <figure>
            <pre
              role="img"
              aria-label="ASCII portrait of Blueberry the dog"
              className="ascii text-[min(1.8vw,8px)] leading-[1.2] text-muted"
            >
              {BLUEBERRY}
            </pre>
            <figcaption className="mt-3 text-xs text-faint">
              blueberry.txt <span className="text-muted">— also lost</span>
            </figcaption>
          </figure>
        </motion.div>
        <div className="min-w-0 flex-auto md:max-w-lg">
          <Prompt>cd {asPath}</Prompt>
          <p className="mt-2 break-all text-sm text-accent">
            bash: cd: {asPath}: No such file or directory
          </p>
          <h1 className="mt-10">
            <AsciiArt
              art={NOT_FOUND}
              label="404"
              className="text-[min(3.2vw,18px)]"
            />
            <span className="mt-6 block text-2xl font-extrabold text-fg sm:text-3xl">
              Page not found
            </span>
          </h1>
          <p className="mt-4 text-sm text-muted">You are lost.</p>
          <Link href="/" className="term-link mt-10 inline-block text-sm">
            <span aria-hidden="true">&larr;</span> cd ~
          </Link>
        </div>
      </div>
    </Container>
  );
}
