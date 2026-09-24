import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

// Glyphs cycled through while scrambling; all covered by the .ascii font stack
// at the same advance width as the art itself.
const GLYPHS = '█▓▒░╔╗╚╝═║╬#%@&*+=<>/\\';

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

// Scrambles every non-space cell through random glyphs, locking each one into
// place in a jittery left-to-right sweep. Starts on mount and replays on click.
function useScramble(art, enabled) {
  let [display, setDisplay] = useState(art);
  let frameRef = useRef();

  let play = useCallback(() => {
    if (!enabled) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (frameRef.current) return;

    let lines = art.split('\n');
    let width = Math.max(...lines.map((line) => line.length));
    let cells = lines.map((line) =>
      [...line].map((char, col) => ({
        char,
        // ms after start when this cell settles
        settleAt:
          char === ' ' ? 0 : 150 + (col / width) * 700 + Math.random() * 350,
      })),
    );

    let start = performance.now();
    let lastTick = 0;
    let tick = (now) => {
      let elapsed = now - start;
      // swap glyphs at ~25fps so the noise reads as flicker, not a blur
      if (now - lastTick > 40) {
        lastTick = now;
        let done = true;
        setDisplay(
          cells
            .map((row) =>
              row
                .map(({ char, settleAt }) => {
                  if (elapsed >= settleAt) return char;
                  done = false;
                  // occasional blank cells make it feel more like signal loss
                  return Math.random() < 0.1 ? ' ' : randomGlyph();
                })
                .join(''),
            )
            .join('\n'),
        );
        if (done) {
          frameRef.current = undefined;
          return;
        }
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
  }, [art, enabled]);

  useEffect(() => {
    play();
    return () => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = undefined;
      setDisplay(art);
    };
  }, [art, play]);

  return [display, play];
}

// Renders figlet "ANSI Shadow" art in two tones: solid blocks in the accent
// color, the box-drawing drop shadow faint.
export function AsciiArt({ art, label, scramble = false, className, style }) {
  let [display, replay] = useScramble(art, scramble);
  let lines = art.split('\n');
  let displayLines = display.split('\n');
  let width = Math.max(...lines.map((line) => line.length));

  return (
    <pre
      role="img"
      aria-label={label}
      className={clsx('ascii select-none', className)}
      style={{ '--ascii-cols': width, ...style }}
      onClick={replay}
    >
      {lines.map((line, i) => {
        // color by the final art so tones stay put while glyphs scramble
        let offset = 0;
        return (
          <span key={i}>
            {line.split(/(█+)/).map((run, j) => {
              let text = displayLines[i].slice(offset, offset + run.length);
              offset += run.length;
              return (
                <span
                  key={j}
                  className={run.startsWith('█') ? 'text-accent' : 'text-faint'}
                >
                  {text}
                </span>
              );
            })}
            {i < lines.length - 1 && '\n'}
          </span>
        );
      })}
    </pre>
  );
}
