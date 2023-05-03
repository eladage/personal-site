import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'

import NAVIGATION_ITEMS from '../constants/NAVIGATION_ITEMS'

export default function AnimatedTabs() {
  let pathname = useRouter().pathname

  return (
    <nav className="group pointer-events-auto relative hidden md:block">
      <div className="flex h-full space-x-1">
        <ul className="flex h-full select-none">
          {NAVIGATION_ITEMS.map((navItem) => (
            <Link
              href={navItem.href}
              key={navItem.label}
              className={`h-full ${
                pathname === navItem.href
                  ? ''
                  : 'hover:text-pink-500 dark:hover:text-pink-400'
              } relative rounded-full px-3 py-2 text-sm font-medium text-zinc-800 transition focus-visible:outline-2 dark:text-zinc-200`}
              style={{
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {pathname === navItem.href && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0  z-10 h-full mix-blend-overlay shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5  dark:border-0 dark:bg-white dark:bg-zinc-800/90 dark:mix-blend-difference dark:ring-white/10 dark:hover:ring-white/20"
                  style={{ borderRadius: 9999 }}
                  transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
                />
              )}
              <span>{navItem.label}</span>
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  )
}
