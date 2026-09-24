import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import { Container } from '@/components/Container';
import { AnimatedTitle } from '@/components/AnimatedTitle';
import avatarImage from '@/images/avatar.jpg';

import NAVIGATION_ITEMS from '../constants/NAVIGATION_ITEMS';

function isActivePath(pathname, href) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

// tmux-style window list: `1:home* 2:about 3:blog 4:work`
function Navigation() {
  let { pathname } = useRouter();

  return (
    <nav aria-label="Main">
      <ul className="flex flex-wrap items-center gap-x-0.5 text-xs sm:gap-x-1 sm:text-sm">
        {NAVIGATION_ITEMS.map((item, index) => {
          let isActive = isActivePath(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={clsx(
                  'block px-1.5 py-1 transition-colors sm:px-2',
                  isActive
                    ? 'bg-accent font-bold text-bg'
                    : 'text-muted hover:bg-panel hover:text-fg',
                )}
              >
                <span className={isActive ? '' : 'text-faint'}>
                  {index + 1}:
                </span>
                {item.label.toLowerCase()}
                <span aria-hidden="true">{isActive ? '*' : ' '}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// Number keys jump between pages, like switching tmux windows.
function useNumberKeyNavigation() {
  let router = useRouter();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      let target = event.target;
      if (
        target.isContentEditable ||
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
      ) {
        return;
      }
      let item = NAVIGATION_ITEMS[Number(event.key) - 1];
      if (item) router.push(item.href);
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [router]);
}

function ModeToggle() {
  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none');
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none');
    }, 0);
  }

  function toggleMode() {
    disableTransitionsTemporarily();

    let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    let isSystemDarkMode = darkModeMediaQuery.matches;
    let isDarkMode = document.documentElement.classList.toggle('dark');

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode;
    } else {
      window.localStorage.isDarkMode = isDarkMode;
    }
  }

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      className="flex-none border border-line px-2 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
      onClick={toggleMode}
    >
      <span className="dark:hidden">
        [ ☾<span className="hidden sm:inline"> dark</span> ]
      </span>
      <span className="hidden dark:inline">
        [ ☀<span className="hidden sm:inline"> light</span> ]
      </span>
    </button>
  );
}

export function Header() {
  let { pathname } = useRouter();
  let cwd = pathname === '/' ? '~' : `~${pathname.replace(/\[.*\]/, '')}`;

  useNumberKeyNavigation();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
          <Link
            href="/"
            aria-label="Home"
            className="group flex min-w-0 items-center gap-3"
          >
            <Image
              src={avatarImage}
              alt=""
              sizes="2rem"
              className="h-8 w-8 flex-none border border-line object-cover grayscale transition group-hover:grayscale-0"
              priority
            />
            <span className="flex min-w-0 items-baseline gap-2 text-sm">
              <AnimatedTitle
                as="span"
                title="eriic.dev"
                textSize="sm"
                className="text-ok"
              />
              <span className="truncate text-muted">
                :{cwd}
                <span className="text-accent">$</span>
              </span>
            </span>
          </Link>
          <div className="flex w-full items-center justify-between gap-3 md:w-auto md:justify-end">
            <Navigation />
            <ModeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}
