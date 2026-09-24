import Link from 'next/link';
import { useRouter } from 'next/router';

import { Container } from '@/components/Container';
import { AsciiRule } from '@/components/AsciiRule';

import NAVIGATION_ITEMS from '../constants/NAVIGATION_ITEMS.js';

// vim-style statusline
export function Footer() {
  let { pathname } = useRouter();
  let file =
    pathname === '/'
      ? 'index.jsx'
      : `${pathname.slice(1)}.${
          pathname.startsWith('/articles/') ? 'mdx' : 'jsx'
        }`;

  return (
    <footer className="mt-32">
      <Container>
        <AsciiRule pattern="░" className="mb-6" />
        <div className="flex flex-col gap-6 pb-10 text-xs sm:flex-row sm:items-start sm:justify-between">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-2">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className="text-muted transition-colors hover:text-accent"
              >
                ./{item.label.toLowerCase()}
              </Link>
            ))}
            <Link
              href="/rss/feed.xml"
              className="text-muted transition-colors hover:text-accent"
            >
              ./rss
            </Link>
          </nav>
        </div>
      </Container>
      <div className="border-t border-line bg-panel text-xs">
        <Container>
          <div className="flex items-center justify-between gap-4 py-1.5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex-none bg-accent px-2 font-bold text-bg">
                NORMAL
              </span>
              <span className="truncate text-muted">
                {file}
              </span>
            </div>
            <span className="flex-none text-muted">
              &copy; {new Date().getFullYear()} Eric Ladage
              <span className="hidden sm:inline"> · all rights reserved</span>
            </span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
