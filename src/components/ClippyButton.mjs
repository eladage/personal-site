import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import {
  countVisit,
  getDossier,
  getFactLines,
  getLoadedFacts,
  loadFacts,
} from './clippyFacts.mjs';

const EDGE_MARGIN = 16;
const GREET_DELAY = 1000;
const IDLE_TIMEOUT = 30000;
const ACTIVITY_EVENTS = ['scroll', 'pointermove', 'keydown', 'touchstart'];
// how often a greeting is about the visitor rather than the page
const FACT_GREETING_CHANCE = 1 / 3;

// what he says (and does) on each page
function getGreeting(pathname) {
  if (pathname === '/') {
    return {
      animation: 'Wave',
      text: "It looks like you're visiting a personal website. Would you like help judging it?",
    };
  }
  if (pathname.startsWith('/articles/')) {
    return {
      animation: 'Searching',
      text: "It looks like you're reading a blog post. Would you like me to summarize it? (I can't.)",
    };
  }
  if (pathname === '/articles') {
    return {
      animation: 'Writing',
      text: "It looks like you're browsing a blog. Would you like me to read them all for you?",
    };
  }
  if (pathname === '/work') {
    return {
      animation: 'GetTechy',
      text: "It looks like you're evaluating a candidate. Would you like help hiring Eric?",
    };
  }
  if (pathname === '/photos') {
    return {
      animation: 'GetArtsy',
      text: 'Nice photos. Would you like me to add a WordArt border?',
    };
  }
  if (pathname === '/about') {
    return {
      animation: 'Explain',
      text: "It looks like you're learning about Eric. I've known him since he was a .doc file.",
    };
  }
  if (pathname === '/404') {
    return {
      animation: 'EmptyTrash',
      text: "It looks like you're lost. I've been lost since 2007.",
    };
  }
  return {
    animation: 'Greeting',
    text: 'It looks like you need help. I am here to provide it, whether you like it or not.',
  };
}

// clippyts has no teardown API and its own hide/position logic is buggy, so
// we reach into the agent's element (`_el`) to hide, place, and remove it.
function getElement(agent) {
  return agent._el;
}

// Cut him off mid-action. stop() clears the queue but can't interrupt the
// balloon: its word loop keeps typing the old line, and the speak() never
// reports done, which leaves the queue stuck and ignores everything after it.
// So kill the loop by hand and finish that speak() ourselves.
function silence(agent) {
  agent.stop();
  let balloon = agent._balloon;
  let wasSpeaking = balloon._active || balloon._hold;
  window.clearTimeout(balloon._loop);
  window.clearTimeout(balloon._hiding);
  balloon._addWord = null;
  balloon._active = false;
  balloon._hold = false;
  balloon.hide(true);
  if (wasSpeaking) balloon._complete?.();
}

// each click annoys him a little more; the last one makes him quit
const POKES = [
  { animation: 'Alert', text: 'Hey! That tickles.' },
  {
    animation: 'GetAttention',
    text: "Did you need something? I'm very busy being a paperclip.",
  },
  {
    animation: 'Explain',
    text: "Tip: press 1–4 to switch pages. You're welcome.",
  },
  {
    animation: 'CheckingSomething',
    text: () => getDossier(getLoadedFacts()) ?? 'Please stop poking me.',
  },
  { animation: 'Writing', text: "I'm writing this down." },
  { animation: 'Print', text: 'Printing a formal complaint…' },
  { animation: 'EmptyTrash', text: "That's it. I'm telling Eric." },
];

// He's fixed in the corner, so swallow the library's drag (mousedown) and
// random-animation (dblclick) handlers. Capture listeners on the target run
// before its bubble ones, so stopImmediatePropagation beats the library's.
function listenForPokes(agent, onPoke) {
  let el = getElement(agent);
  let block = (event) => event.stopImmediatePropagation();
  el.addEventListener('mousedown', block, true);
  el.addEventListener('dblclick', block, true);
  el.addEventListener('click', onPoke);
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function greet(agent, pathname) {
  let factLines = getFactLines(getLoadedFacts());
  let { animation, text } =
    factLines.length && Math.random() < FACT_GREETING_CHANCE
      ? pick(factLines)
      : getGreeting(pathname);
  agent.play(animation);
  agent.speak(text);
}

const BALLOON_GAP = 15;
const BALLOON_SIDES = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

// The library's balloon positioning is broken twice over: it measures the
// bubble after emptying it (so it grows down over Clippy as words type in),
// and it swaps scrollTop/scrollLeft (so it drifts on scrolled pages). Replace
// it with one that sizes the bubble for the whole line and uses viewport
// coords, which is what `position: fixed` wants anyway.
function patchBalloon(agent) {
  let balloon = agent._balloon;
  let speak = balloon.speak.bind(balloon);
  balloon.speak = (complete, text, hold) => {
    balloon._fullText = text;
    speak(complete, text, hold);
  };
  balloon.reposition = () => placeBalloon(agent);
}

function placeBalloon(agent) {
  let balloon = agent._balloon;
  let el = balloon._balloon;
  let content = balloon._content;
  if (el.hasAttribute('hidden')) return;

  // lock the content box to the full line's size before it types out
  let typed = content.innerHTML;
  content.style.width = '';
  content.style.height = '';
  content.innerHTML = balloon._fullText ?? typed;
  let size = content.getBoundingClientRect();
  content.style.width = `${Math.ceil(size.width)}px`;
  content.style.height = `${Math.ceil(size.height)}px`;
  content.innerHTML = typed;

  let target = getElement(agent).getBoundingClientRect();
  let width = el.offsetWidth;
  let height = el.offsetHeight;
  let spots = {
    'top-left': [target.right - width, target.top - height - BALLOON_GAP],
    'top-right': [target.left, target.top - height - BALLOON_GAP],
    'bottom-left': [target.right - width, target.bottom + BALLOON_GAP],
    'bottom-right': [target.left, target.bottom + BALLOON_GAP],
  };
  let fits = ([left, top]) =>
    left >= EDGE_MARGIN &&
    top >= EDGE_MARGIN &&
    left + width <= window.innerWidth - EDGE_MARGIN &&
    top + height <= window.innerHeight - EDGE_MARGIN;
  let side = BALLOON_SIDES.find((s) => fits(spots[s])) ?? BALLOON_SIDES[0];
  let [left, top] = spots[side];

  el.classList.remove(...BALLOON_SIDES.map((s) => `clippy-${s}`));
  el.classList.add(`clippy-${side}`);
  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
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

function showAgent(agent, timerRef, wantVisibleRef, pathnameRef) {
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

  greetSoon(agent, timerRef, wantVisibleRef, pathnameRef);
}

function greetSoon(agent, timerRef, wantVisibleRef, pathnameRef) {
  window.clearTimeout(timerRef.current);
  timerRef.current = window.setTimeout(() => {
    if (!wantVisibleRef.current) return;
    silence(agent);
    greet(agent, pathnameRef.current);
  }, GREET_DELAY);
}

// wave goodbye before hiding, unless he's summoned again in the meantime
function dismissAgent(agent, timerRef, wantVisibleRef) {
  window.clearTimeout(timerRef.current);
  silence(agent);
  agent.speak("You'll be back.");
  let played = agent.play('GoodBye', 5000, () => {
    if (!wantVisibleRef.current) hideAgent(agent, timerRef);
  });
  if (!played) hideAgent(agent, timerRef);
}

function hideAgent(agent, timerRef) {
  window.clearTimeout(timerRef.current);
  silence(agent);
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
  const { pathname } = useRouter();
  const [showClippy, setShowClippy] = useState(false);
  const agentRef = useRef(null);
  const loadingRef = useRef(false);
  const animateTimerRef = useRef();
  // latest desired visibility, read by the async loader once it resolves
  const wantVisibleRef = useRef(false);
  const mountedRef = useRef(true);
  const pokesRef = useRef(0);

  function poke() {
    let agent = agentRef.current;
    if (!agent || !wantVisibleRef.current) return;
    window.clearTimeout(animateTimerRef.current);
    silence(agent);

    let { animation, text } = POKES[pokesRef.current];
    pokesRef.current += 1;
    agent.speak(typeof text === 'function' ? text() : text);
    if (pokesRef.current < POKES.length) {
      agent.play(animation);
      return;
    }
    pokesRef.current = 0;
    agent.play(animation, 5000, () => {
      if (mountedRef.current) setShowClippy(false);
    });
  }
  const pokeRef = useRef(poke);
  pokeRef.current = poke;
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  useEffect(() => {
    wantVisibleRef.current = showClippy;
    // start gathering visitor facts so they're ready by his first line
    if (showClippy) loadFacts();
    let agent = agentRef.current;

    if (agent) {
      if (showClippy)
        showAgent(agent, animateTimerRef, wantVisibleRef, pathnameRef);
      else dismissAgent(agent, animateTimerRef, wantVisibleRef);
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
            patchBalloon(loaded);
            listenForPokes(loaded, () => pokeRef.current());
            agentRef.current = loaded;
            if (wantVisibleRef.current)
              showAgent(loaded, animateTimerRef, wantVisibleRef, pathnameRef);
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

  // new page, new unsolicited advice
  useEffect(() => {
    let agent = agentRef.current;
    if (agent && wantVisibleRef.current)
      greetSoon(agent, animateTimerRef, wantVisibleRef, pathnameRef);
  }, [pathname]);

  // nod off when the visitor goes quiet, and wake up when they come back
  useEffect(() => {
    if (!showClippy) return;
    let idleTimer;
    let asleep = false;

    function fallAsleep() {
      let agent = agentRef.current;
      if (!agent || !wantVisibleRef.current) return;
      asleep = true;
      silence(agent);
      agent.speak('Zzz…');
      agent.play('IdleSnooze', 0);
    }

    function onActivity() {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(fallAsleep, IDLE_TIMEOUT);
      let agent = agentRef.current;
      if (!asleep || !agent) return;
      asleep = false;
      silence(agent);
      agent.play('Alert');
      agent.speak("Oh! You're back. I wasn't sleeping.");
    }

    onActivity();
    ACTIVITY_EVENTS.forEach((type) =>
      window.addEventListener(type, onActivity, { passive: true })
    );
    return () => {
      window.clearTimeout(idleTimer);
      ACTIVITY_EVENTS.forEach((type) =>
        window.removeEventListener(type, onActivity)
      );
    };
  }, [showClippy]);

  useEffect(() => {
    mountedRef.current = true;
    countVisit();

    function onResize() {
      let agent = agentRef.current;
      if (!agent || !wantVisibleRef.current) return;
      placeInViewport(getElement(agent));
      placeBalloon(agent);
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
      aria-label={showClippy ? 'Dismiss Clippy' : 'Summon Clippy'}
      aria-pressed={showClippy}
      title={title}
      className={
        'flex-none border px-2 py-1 text-xs transition-colors hover:border-accent hover:text-accent ' +
        (showClippy ? 'border-accent text-accent' : 'border-line text-muted')
      }
      onClick={() => setShowClippy((shown) => !shown)}
    >
      [ 📎 ]
    </button>
  );
}
