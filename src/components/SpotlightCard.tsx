import { MouseEvent } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

interface SpotlightCardProps {
  spotlightSize?: number
  children: React.ReactNode
}

export function SpotlightCard({
  children,
  spotlightSize = 500,
}: SpotlightCardProps): JSX.Element {
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect()

    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className="group relative h-full overflow-hidden rounded-3xl border border-zinc-100 p-8 px-8 py-16 shadow-2xl dark:border-zinc-700/40"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${mouseX}px ${mouseY}px, rgba(254, 247, 238,  0.15), transparent 80%)`,
        }}
      />
      {children}
    </div>
  )
}
