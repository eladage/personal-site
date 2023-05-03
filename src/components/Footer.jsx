import Link from 'next/link'

import { Container } from '@/components/Container'
import ClippyButton from './ClippyButton.mjs'
import ConfettiWrapper from './ConfettiWrapper'

import NAVIGATION_ITEMS from '../constants/NAVIGATION_ITEMS.js'

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="transition hover:text-pink-500 dark:hover:text-pink-400"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {NAVIGATION_ITEMS.map((item) => (
                  <NavLink href={item.href} key={item.href}>
                    {item.label}
                  </NavLink>
                ))}
              </div>
              <div>
                <p className="text-sm text-zinc-400 dark:text-zinc-500">
                  &copy; {new Date().getFullYear()} Eric Ladage. All rights
                  reserved.
                </p>
                <div className="mt-1">
                  <ConfettiWrapper>
                    <ClippyButton title="Need Help?" />
                  </ConfettiWrapper>
                </div>
              </div>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
}
