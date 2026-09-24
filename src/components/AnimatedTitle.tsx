import { useState, useEffect, useRef } from 'react';

const textSizeMapping = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
};

interface AnimatedTitleProps {
  title: string;
  allowUppercase?: boolean;
  allowNumbers?: boolean;
  allowRerender?: boolean;
  showCursor?: boolean;
  textSize?: keyof typeof textSizeMapping;
  as?: 'h1' | 'h2' | 'span';
  className?: string;
}

export function AnimatedTitle({
  title,
  allowUppercase = false,
  allowNumbers = false,
  allowRerender = true,
  showCursor = false,
  textSize = '2xl',
  as: Component = 'h1',
  className = 'text-fg',
}: AnimatedTitleProps) {
  const [displayTitle, setDisplayTitle] = useState(
    title.split('').map(() => ''),
  );
  const [completed, setCompleted] = useState<boolean>(false);
  const timeoutRef = useRef<number | undefined>();
  const [isBlinking, setIsBlinking] = useState<boolean>(true);

  const textSizeClass = textSizeMapping[textSize];

  const randomCharacter = () => {
    let characters = 'abcdefghijklmnopqrstuvwxyz.';
    if (allowUppercase) {
      characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ';
    }
    if (allowNumbers) {
      characters += '0123456789';
    }
    return characters.charAt(Math.floor(Math.random() * characters.length));
  };

  useEffect(() => {
    if (!completed) {
      const newTitle = [...displayTitle];
      let allCharactersSet = true;

      newTitle.forEach((char, index) => {
        if (char !== title[index]) {
          allCharactersSet = false;
          newTitle[index] = randomCharacter();
        }
      });

      if (allCharactersSet) {
        setCompleted(true);
      } else {
        timeoutRef.current = setTimeout(
          () => setDisplayTitle(newTitle),
          8,
        ) as any;
      }
    }
    const timer = setTimeout(() => {
      setIsBlinking(false);
    }, 10000);

    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(timer);
    };
  }, [displayTitle, title, completed, isBlinking]);

  const handleMouseOver = () => {
    if (completed && allowRerender) {
      setIsBlinking(true);
      setCompleted(false);
      setDisplayTitle(title.split('').map(() => ''));
    }
  };

  return (
    <Component
      aria-label={title}
      className={`${textSizeClass} font-mono font-bold ${className}`}
      onMouseOver={handleMouseOver}
    >
      <span aria-hidden="true">{displayTitle.join('')}</span>
      {showCursor && (
        <span
          aria-hidden="true"
          className={`${
            isBlinking ? 'animate-blink' : 'invisible'
          } ml-px inline-block h-[1em] w-[0.55em] translate-y-[0.15em] bg-accent`}
        />
      )}
    </Component>
  );
}
