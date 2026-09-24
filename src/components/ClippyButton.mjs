import React, { useEffect, useRef, useState } from 'react';

const EDGE_MARGIN = 16;

// clippyts has no teardown API and its own hide/position logic is buggy, so
// we reach into the agent's element (`_el`) to hide, place, and remove it.
function getElement(agent) {
  return agent._el;
}

// The library parks Clippy at 80% of the viewport with no bounds check, which
// puts him partly off-screen on phones. Clamp him inside the viewport instead.
function placeInViewport(el) {
  let width = el.offsetWidth || 124;
  let height = el.offsetHeight || 93;
  let left = Math.min(
    window.innerWidth * 0.8,
    window.innerWidth - width - EDGE_MARGIN
  );
  let top = Math.min(
    window.innerHeight * 0.8,
    window.innerHeight - height - EDGE_MARGIN
  );
  el.style.left = `${Math.max(EDGE_MARGIN, left)}px`;
  el.style.top = `${Math.max(EDGE_MARGIN, top)}px`;
}

function showAgent(agent, timerRef, wantVisibleRef) {
  let el = getElement(agent);
  // show() only draws once its first frame runs, so put him in place first
  el.style.display = 'block';
  placeInViewport(el);
  agent.show();
  placeInViewport(el);
  // The library's resize handler runs only while `hidden` is set (its check is
  // inverted) and mixes up scrollTop/scrollLeft, flinging him to the left edge
  // whenever a scrolled page resizes (e.g. a mobile URL bar collapsing).
  // show() never clears the attribute, so clear it to keep that handler idle.
  el.removeAttribute('hidden');
  // keep him fixed in the corner rather than draggable
  el.style.pointerEvents = 'none';

  window.clearTimeout(timerRef.current);
  timerRef.current = window.setTimeout(() => {
    if (wantVisibleRef.current) agent.animate();
  }, 2000);
}

function hideAgent(agent, timerRef) {
  window.clearTimeout(timerRef.current);
  agent.stop();
  agent.hide(true);
  // hide(true) only sets the `hidden` attribute, which the inline
  // `display: block` from the last animation frame overrides
  getElement(agent).style.display = 'none';
}

function destroyAgent(agent, timerRef) {
  hideAgent(agent, timerRef);
  let el = getElement(agent);
  let balloon = el.nextElementSibling;
  if (balloon?.classList.contains('clippy-balloon')) balloon.remove();
  el.remove();
}

export default function ClippyButton({ title }) {
  const [showClippy, setShowClippy] = useState(false);
  const agentRef = useRef(null);
  const loadingRef = useRef(false);
  const animateTimerRef = useRef();
  // latest desired visibility, read by the async loader once it resolves
  const wantVisibleRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    wantVisibleRef.current = showClippy;
    let agent = agentRef.current;

    if (agent) {
      if (showClippy) showAgent(agent, animateTimerRef, wantVisibleRef);
      else hideAgent(agent, animateTimerRef);
      return;
    }

    // load a single agent on first open and reuse it from then on
    if (!showClippy || loadingRef.current) return;
    loadingRef.current = true;

    import('clippyts')
      .then(({ default: clippy }) => {
        clippy.load({
          name: 'Clippy',
          successCb: (loaded) => {
            loadingRef.current = false;
            if (!mountedRef.current) {
              destroyAgent(loaded, animateTimerRef);
              return;
            }
            agentRef.current = loaded;
            if (wantVisibleRef.current)
              showAgent(loaded, animateTimerRef, wantVisibleRef);
          },
          failCb: (error) => {
            loadingRef.current = false;
            console.error(error);
          },
        });
      })
      .catch((error) => {
        loadingRef.current = false;
        console.error(error);
      });
  }, [showClippy]);

  useEffect(() => {
    mountedRef.current = true;

    function onResize() {
      let agent = agentRef.current;
      if (agent && wantVisibleRef.current) placeInViewport(getElement(agent));
    }
    window.addEventListener('resize', onResize);

    return () => {
      mountedRef.current = false;
      window.removeEventListener('resize', onResize);
      if (agentRef.current) {
        destroyAgent(agentRef.current, animateTimerRef);
        agentRef.current = null;
      }
    };
  }, []);

  return (
    <button
      type="button"
      aria-pressed={showClippy}
      className="text-xs text-muted transition-colors hover:text-accent"
      onClick={() => setShowClippy((shown) => !shown)}
    >
      {`📎 ${title} `}
      <span className="ml-1 border border-warn px-1 font-bold uppercase text-warn">
        beta
      </span>
    </button>
  );
}
