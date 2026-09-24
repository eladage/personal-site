import { useEffect, useRef } from 'react';
import clsx from 'clsx';

const RAMP = ' .·:-=+*#%@';
const FPS = 18;

// Slow-moving interference pattern drawn with characters. It swells around
// the pointer. Writes straight to the DOM so React never re-renders per frame.
export function AsciiField({ className }) {
  let preRef = useRef(null);

  useEffect(() => {
    let pre = preRef.current;
    let reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let cols = 0;
    let rows = 0;
    let pointer = { x: -999, y: -999 };
    let visible = true;
    let frame;
    let last = 0;

    function measure() {
      let probe = document.createElement('span');
      probe.textContent = 'M';
      pre.appendChild(probe);
      let { width } = probe.getBoundingClientRect();
      pre.removeChild(probe);
      let height = parseFloat(getComputedStyle(pre).lineHeight);
      let rect = pre.parentElement.getBoundingClientRect();
      cols = Math.ceil(rect.width / width);
      rows = Math.ceil(rect.height / height);
      return { width, height, rect };
    }

    let metrics = measure();

    function draw(t) {
      let out = '';
      let time = t / 1000;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let v =
            Math.sin(x * 0.09 + time * 0.6) +
            Math.sin(y * 0.21 - time * 0.4) +
            Math.sin((x + y * 2) * 0.05 + time * 0.3) +
            Math.sin(Math.hypot(x - cols * 0.7, (y - rows * 0.3) * 2) * 0.12 - time);
          let dx = x - pointer.x;
          let dy = (y - pointer.y) * 2;
          v += 3 * Math.exp(-(dx * dx + dy * dy) / 90);
          let n = Math.max(0, Math.min(0.999, (v + 2) / 7));
          out += RAMP[Math.floor(n * RAMP.length)];
        }
        out += '\n';
      }
      pre.textContent = out;
    }

    function loop(t) {
      frame = requestAnimationFrame(loop);
      if (!visible || document.hidden || t - last < 1000 / FPS) return;
      last = t;
      draw(t);
    }

    function onPointerMove(event) {
      let { rect, width, height } = metrics;
      pointer.x = (event.clientX - rect.left) / width;
      pointer.y = (event.clientY - rect.top) / height;
    }

    function onResize() {
      metrics = measure();
      if (reduceMotion) draw(0);
    }

    let observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(pre);
    window.addEventListener('resize', onResize);

    if (reduceMotion) {
      draw(0);
    } else {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('scroll', onResize, { passive: true });
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onResize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={clsx('pointer-events-none overflow-hidden', className)}
    >
      <pre ref={preRef} className="ascii text-xs leading-[1.1]" />
    </div>
  );
}
