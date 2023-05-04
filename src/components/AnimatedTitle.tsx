import { useState, useEffect, useRef } from 'react'

const textSizeMapping = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
}

interface AnimatedTitleProps {
  title: string
  allowUppercase?: boolean
  showCursor?: boolean
  textSize?: keyof typeof textSizeMapping
}

export function AnimatedTitle({
  title,
  allowUppercase = false,
  showCursor = false,
  textSize = '2xl',
}: AnimatedTitleProps) {
  const [displayTitle, setDisplayTitle] = useState(
    title.split('').map(() => '')
  )
  const [completed, setCompleted] = useState<boolean>(false)
  const timeoutRef = useRef<number | undefined>()
  const [isBlinking, setIsBlinking] = useState<boolean>(true)

  const textSizeClass = textSizeMapping[textSize]

  const randomCharacter = () => {
    let characters = 'abcdefghijklmnopqrstuvwxyz.'
    if (allowUppercase) {
      characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ '
    }
    return characters.charAt(Math.floor(Math.random() * characters.length))
  }

  useEffect(() => {
    if (!completed) {
      const newTitle = [...displayTitle]
      let allCharactersSet = true

      newTitle.forEach((char, index) => {
        if (char !== title[index]) {
          allCharactersSet = false
          newTitle[index] = randomCharacter()
        }
      })

      if (allCharactersSet) {
        setCompleted(true)
      } else {
        timeoutRef.current = setTimeout(
          () => setDisplayTitle(newTitle),
          8
        ) as any
      }
    }
    const timer = setTimeout(() => {
      setIsBlinking(false)
    }, 10000)

    return () => {
      clearTimeout(timeoutRef.current)
      clearTimeout(timer)
    }
  }, [displayTitle, title, completed, isBlinking])

  const handleMouseOver = () => {
    if (completed) {
      setIsBlinking(true)
      setCompleted(false)
      setDisplayTitle(title.split('').map(() => ''))
    }
  }

  return (
    <h1
      className={`${textSizeClass} font-mono text-zinc-600 dark:text-zinc-400`}
      onMouseOver={handleMouseOver}
    >
      <span>{displayTitle.join('')}</span>
      {showCursor && (
        <span
          className={`${isBlinking ? 'animate-blink' : 'invisible'} text-3xl`}
        >
          |
        </span>
      )}
    </h1>
  )
}
